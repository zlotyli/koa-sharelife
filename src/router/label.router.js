const Router = require('koa-router');

const lableRouter = new Router({prefix:"/label"});
// 导入验证中间件函数
const {
  verifyAuth
} = require('../middleware/auth.middleware')
// 导入路由处理中间件
const {
  create,
  list
} = require('../controller/label.controller.js')
// 创建标签
lableRouter.post('/', verifyAuth, create);
// 展示标签
lableRouter.get('/', list);

module.exports = lableRouter;