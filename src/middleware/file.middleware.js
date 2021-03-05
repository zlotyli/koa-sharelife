// 导入上传文件需要的库--multer
const Multer = require('koa-multer');
// 导入jimp
const Jimp = require('jimp');
// 导入path模块
const path = require('path');
// 导入头像保存路径的常量
const { 
  AVATER_PATH,
  PICTURE_PATH
} = require('../constants/file_path')
// 1. 头像上传相关
const avatarUpload = Multer({
  dest: AVATER_PATH  //头像文件保存地址
})

const avatarHandler = avatarUpload.single('avatar');//添加单个文件的上传字段--生成处理中间件

// 2. 动态的配图上传相关
const pictureUpload = Multer({
  dest: PICTURE_PATH  //配图文件保存地址
})
const pictureHandler = pictureUpload.array('picture', 9);//添加多个文件，最多9个--生成处理中间件

const pictureResize = async (ctx, next) => {
  // 1. 获取所有图像信息
  const files = ctx.req.files;

  // 2. 对图像进行处理(sharp/jimp)
  for(let file of files){
    const destPath = path.join(file.destination, file.filename); // 确定文件保存目录
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}