const Router = require('koa-router');

// 导入验证中间件
const {
  verifyAuth
} = require('../middleware/auth.middleware');
// 导入上传文件的中间件
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware')

// 导入路由控制器中间件
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller')
const fileRouter = new Router({prefix:'/upload'});
// 上传头像--验证登录后即可上传
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
// 给动态配图
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter;