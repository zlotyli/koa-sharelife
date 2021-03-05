const jwt = require('jsonwebtoken');//获取jwt对象--用于测试授权验证token使用
const { PRIVATE_KEY, PUBLIC_KEY} = require('../app/config'); // 导入公钥

// 登录校验中间件
// 导入链接数据库的操作---查询数据
const userService = require('../service/user.service');
// 导入authService中定义的是否具有某个条件的查询结果
const authService = require('../service/auth.service');

// 导入错误类型的常量
const errorTypes = require('../constants/error-types');
// 导入密码加密函数
const { md5password } = require('../utils/password-handle');

// 定义校验中间件
// 定义是否可以登录中间件函数
const verifyLogin = async (ctx, next) => {
  console.log('验证登录的middleware');
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名和密码都不为空
  if(!name || !password){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    // 当为空时发射错误事件
    return ctx.app.emit('error', error, ctx);
  }

  // 3.判断用户是否存在(用户不存在)
  const result = await userService.getUserByName(name);
  // console.log('result', result);
  const user = result[0];//获取数据库中存储的对应用户名的一行

  if(!user){ // 当查询到数据库中不存在时返回错误对象
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 4.判断密码是否和数据库中的密码是一致的(加密后对比)
  
  if(md5password(password) !== user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }
  // 设置token逻辑
  // 将数据库中该用户信息存储到ctx.user中
  ctx.user = user;

  // 执行下一个中间件
  await next();
  
}

// 定义登录授权测试验证(token)中间件
const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware~');
  // 获取到请求头中包含有token的属性--authorization---如果有的话
  const authorization = ctx.header.authorization;
  if(!authorization){
    const error = new Error(errorTypes.TOKEN_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 获取token
  const token = authorization.replace('Bearer ','');
  // 验证token---获取到token中包含的数据
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    // 将token解析后数据存储到ctx.user中，为给路由的ctx与其他路由的不同
    ctx.user = result;
    await next();
    
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
  
}

/**
 * 1.需要使用该方法验证权限的有：修改/删除动态  修改/删除评论 
 * 2.接口：业务接口/后台管理系统
 * 一对多： user -> role
 * 多对多：role -> menu
 */
const verifyPermission = async (ctx, next) => {
  console.log('验证权限的middleware');
  // 1. 验证步骤，传入的动态id中查到的的user_id刚好为当前登录用户id
  // 获取到动态id--从url的params中获取
  const [ resourceKey ] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id','');
  const resourceId = ctx.params[resourceKey];
  // 获取用户id--从ctx.user中获取
  const { id } = ctx.user;
  // 2. 查询是否具备修改权限
  try{
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    if(!isPermission){ // 没有权限
      throw new Error();
    }
    await next();
  } catch (err){
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}