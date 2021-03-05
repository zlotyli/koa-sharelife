// 登录逻辑
const Router = require('koa-router');
// 导入路由处理的路由中间件函数
const {
  login,
  success
} = require('../controller/auth.controller');
// 导入其他中间件函数
// 校验中间件
const {
  verifyLogin,
  verifyAuth,
} = require('../middleware/auth.middleware');
const authRouter = new Router()

// 登录接口
authRouter.post('/login', verifyLogin, login);
// 测试验证登录接口
authRouter.get('/test', verifyAuth, success);
module.exports = authRouter;