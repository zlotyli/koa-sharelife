// 导入读取文件的fs模块
const fs = require('fs');
// 导入数据库相关的处理逻辑---在service中
const userService = require('../service/user.service');
// 导入file.service.js中查询头像表的函数
const fileService = require('../service/file.service');
const { AVATER_PATH } = require('../constants/file_path')
class UserController{
  async create(ctx, next){
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await userService.create(user);
    // 返回数据
    ctx.body = result;
  }

  // 返回用户头像
  async avatarInfo(ctx, next){
    // 1. 获取用户的对应头像信息
    const { userId } = ctx.params;
    const avaterInfo = await fileService.getAvatarByUserId(userId); 
    
    // 2. 将头像信息呈现给用户
    // 设置响应类型
    ctx.response.set('content-type', avaterInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATER_PATH}/${avaterInfo.filename}`)
  }

}
module.exports = new UserController();