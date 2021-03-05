// 导入数据库相关操作的函数
const service = require('../service/label.service');

class LabelController{

  // 创建标签
  async create(ctx, next){
    //获取请求体中name
    const {name} = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
  // 展示标签
  async list(ctx, next){
    const { limit, offset } = ctx.query;
    console.log(limit,offset);
    const result = await service.getLabels(limit, offset);
    ctx.body = result;
  }

}

module.exports = new LabelController()