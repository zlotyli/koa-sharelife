// 导入token
const jwt = require('jsonwebtoken');
//导入公钥和私钥
const { PRIVATE_KEY, PUBLIC_KEY} = require('../app/config'); 
class AuthController {
  // 登录中间件函数
  async login(ctx, next){
    // 获取数据库中的登录信息
    const { id, name } = ctx.user;
    // 颁发token
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm:'RS256'
    })
    ctx.body = {
      id,
      name,
      token
    }
  }
  // 测试登录中间件函数
  async success(ctx, next){
    ctx.body = '授权成功~';
  }
}

module.exports = new AuthController;