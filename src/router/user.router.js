// 注册逻辑

const Router = require('koa-router');
// 导入路由对应的处理逻辑路由中间件函数--在controller中
const {
  create,
  avatarInfo
} = require('../controller/user.controller')
// 导入该路由下的其他中间件函数--
const {
  verifyUser,
  hanlePassword
} = require('../middleware/user.middleware');

// user路由
const userRouter = new Router({prefix: '/users'});
// 对应路由下应用中间件,1.验证用户是否存在 2. 加密密码
userRouter.post('/', verifyUser, hanlePassword, create);

// 当用户登录后返回对应的头像
userRouter.get('/:userId/avater', avatarInfo);

module.exports = userRouter;