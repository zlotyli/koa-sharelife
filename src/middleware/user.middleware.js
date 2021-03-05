// 导入错误常量类型
const errorTypes = require('../constants/error-types');
// 导入与数据库相关的对象--可运用其中的方法
const service = require('../service/user.service');
// 导入加密密码的函数
const { md5password } = require('../utils/password-handle');

// 定义验证中间件函数
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password }= ctx.request.body;
  // 2.判断用户名和密码都不为空
  if(!name.trim() || !password.trim()){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    // 当为空时发射错误事件
    return ctx.app.emit('error', error, ctx);
  }
  // 3. 判断这次注册的用户名是没有被注册过的
  const result = await service.getUserByName(name);
  if(result.length){ // 当查询到数据库中已经存在时，返回错误对象
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    
    return ctx.app.emit('error', error, ctx);
  }



  //应用下一个中间件
  await next();
}

// 定义密码处理中间件函数
const hanlePassword = async (ctx, next) => {
  // 取出用户请求中的password
  const { password } = ctx.request.body;
  // 通过加密函数加密password并重新赋值到ctx.request.body.password中
  ctx.request.body.password = md5password(password);


  await next();//执行下一个中间件

}


module.exports = {
  verifyUser,
  hanlePassword
}
