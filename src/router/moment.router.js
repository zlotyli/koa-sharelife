const Router = require('koa-router');

const momentRouter = new Router({prefix:'/moment'});
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')
// 导入登录验证中间件函数（对用户）
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware');
// 导入标签验证中间价(对标签)
const {
  verifyLabelExists
} = require('../middleware/label.middleware');
// 发表动态--发表前需要验证登录---验证成功后执行该路由的执行函数create
momentRouter.post('/', verifyAuth, create);
// 获取所有数据
momentRouter.get('/',list)
// 获取某一条动态---不需要做登录验证
momentRouter.get('/:momentId', detail);


// 1.先要验证token---2.再验证是否具备修改权限
// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);
// 给动态添加标签--3.需要多验证一步标签表中是否含有该标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 用户查看动态配图
momentRouter.get('/images/:filename', fileInfo)
module.exports = momentRouter;