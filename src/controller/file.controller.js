const fileService = require('../service/file.service');
const userService = require('../service/user.service');
//导入头像路径常量
const { APP_HOST , APP_PORT} = require('../app/config')
class FileController{
  // 上传头像的操作
  async saveAvatarInfo(ctx, next){
    // 1.获取图像相关的信息--依次为图像类型，图像字段名，大小
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, id);
    // 3. 将头像地址保存在users表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);
    // 4. 返回结果
    ctx.body = '用户上传头像成功';
  }

  async savePictureInfo(ctx, next){
    // 1.获取动态的配图信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const {momentId} = ctx.query;
    // 2.将所有的图像信息保存在数据库中
    for (let file of files){
      // 取出每个上传照片的信息
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    ctx.body = '动态配图完成';
  }
}

module.exports = new FileController()