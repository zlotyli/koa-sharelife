// 导入与数据库相关操作的函数
const service = require('../service/comment.service.js');

class CommentController{
  // 插入评论
  async create(ctx, next){
    // 1. 需要获取动态的id和评论的内容(从请求体中获取)， 用户的id(从ctx.user中获取)
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    // 2. 将数据插入到数据库的comment表中
    const result = await service.insert(momentId, content, id);
    ctx.body = result;
  }
  // 回复评论
  async reply(ctx, next){
    // 1. 需要获取动态的id 评论的内容content, (从请求体中获取)， 
    // 用户的id(从ctx.user中获取)
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    // 评论的id从url的params中获取
    const { commentId } = ctx.params;

    // 2. 将数据插入到数据库的comment表中
    const result = await service.insert(momentId, content, id, commentId);
    ctx.body = result;
  }
  // 修改评论
  async update(ctx, next){
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = result;
  }
  // 删除评论
  async remove(ctx, next){
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }

  // 获取指定动态下的所有评论--通过对应的动态id
  async list(ctx, next){
    const { momentId } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController()