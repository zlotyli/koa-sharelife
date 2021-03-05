// 导入第三方库--crypto
const crypto = require('crypto');

// 加密用户密码的函数
const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  // 加密后转换成16进制数据，存在于buffer中
  const result = md5.update(password).digest('hex');
  return result;
}


module.exports = {
  md5password
}