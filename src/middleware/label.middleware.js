// 导入操作数据库的判断标签是否存在的函数
const service = require('../service/label.service');

// 判读标签表中是否有该标签--无则添加
const verifyLabelExists = async (ctx, next) => {
  // 1. 取出要添加的所有的标签
  const { labels } = ctx.request.body;
  // 记录每个标签的对应标签表中id
  const newLabels = [];
  // 2. 判断每个标签是否在label表中有记录
  for (let name of labels){
    const labelResult = await service.getLabelByName(name);
    const label = {name};
    if(!labelResult){ // 当标签不存在时
      // 在标签表中创建标签数据--并记录插入后的id
      const result = await service.create(name);
      label.id = result.insertId;
    }else{// 存在时记录该标签的id
      label.id = labelResult.id
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  

  await next();
}


module.exports = {
  verifyLabelExists,
}