const fs = require('fs');

// 导入插入数据库的函数
const fileService = require('../service/file.service');
const momentService= require('../service/moment.service');
const { PICTURE_PATH } = require('../constants/file_path');
class MomentController{
  async create(ctx, next){
    // 1. 获取数据(user_id, content)
    const user_id = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(3333)
    // 2. 将数据插入到数据库中
    const result = await momentService.insert(user_id, content);
    console.log('result', result);
    ctx.body = result;//将插入后数据库返回值作为响应
  }

  // 查询单条动态
  async detail(ctx, next){
    console.log('执行了detail')
    // 1. 获取url上的momentId
    const momentId = ctx.params.momentId;
    // 2. 根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  // 查询所有的动态
  async list(ctx, next){
    console.log('执行了list')
    // 1. 获取数据(offset/size)
    const { offset, size } = ctx.query;
    // 2. 查询列表
    const result = await momentService.getMomentList(offset, size);
    
    ctx.body = result;
  }

  // 修改该动态
  async update(ctx, next){
    // 1.获取url中的params以及请求体中的参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2. 修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }
  // 删除该动态
  async remove(ctx, next){
    // 1. 在url中获取momentId--用于删除指定id的动态
    const { momentId } = ctx.params;
    // 2. 删除内容
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  // 给动态添加标签
  async addLabels(ctx, next){
    // 1.获取含有要插入的标签对象和动态id
    const { labels } = ctx;
    const {momentId} = ctx.params;
    console.log(labels, momentId);
    // 2. 添加所有标签
    // 添加前要验证该标签是否已经对应了此动态
    for(let label of labels){
      const isExist = await momentService.hasLabel(momentId, label.id);
      if(!isExist){//当该动态没有与该标签有联系时
         await momentService.addLabels(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功"
  }

  // 当用户查看动态配图时
  async fileInfo(ctx, next){
    // 获取文件名--来查询数据库中file表对应的信息
    const { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    // 从用户url中获取type类型
    const { type } = ctx.query;

    const types = ['small', 'middle', 'large'];
    if(types.some(item => item === type)){
      filename = filename + '-' + type;
    }
    // 将文件以对应类型呈现给用户
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();