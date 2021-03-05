// 处理项目内部环境变量--在此导出
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path')

dotenv.config();//会将.env文件中的内容添加到process.env对象中

// 将私钥和公钥存储在此
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'));

// 将process.env对象中分离出.env文件中的内容再导出
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;
// 导入公钥和私钥
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;