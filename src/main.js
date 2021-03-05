const app = require('./app');
// 导入环境变量
const config = require('./app/config');


app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功`);
});