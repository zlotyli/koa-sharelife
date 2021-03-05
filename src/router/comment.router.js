const Router = require('koa-router');
// 导入验证中间件
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

// 导入路由执行中间件
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller.js')

const commentRouter = new Router({prefix: '/comment'});

// 发表评论
commentRouter.post('/', verifyAuth, create);
// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
// 1. 验证登录token  2. 验证修改/删除权限
// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);
// 获取评论信息
commentRouter.get('/', list);
module.exports =  commentRouter;