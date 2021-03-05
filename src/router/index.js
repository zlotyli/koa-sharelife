const fs = require('fs');
// 定义导入注册路由的函数
const useRoutes = function(){
  //读取该目录下的文件，对每个文件中的router对象进行导入，并注册
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return; //排除本index文件
    const router = require(`./${file}`);
    // 对每个文件的router对象进行注册
    this.use(router.routes());
    this.use(router.allowedMethods());// 判断router的请求方式是否允许
  })
}

module.exports = useRoutes;