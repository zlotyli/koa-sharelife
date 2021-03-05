// 导入错误常量类型
const errorTypes = require('../constants/error-types');


const errorHandle = (error, ctx) => {
  let status, message;
  console.log(error.message);
  switch (error.message){
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED: //用户名或密码为空
      status = 400; //错误请求Bad Request
      message = '用户名或密码不能为空';
      break;
    case errorTypes.USER_ALREADY_EXISTS: //用户名已经存在
      status = 409; //conflict 冲突
      message = '用户名已经存在';
      break;
    case errorTypes.USER_DOES_NOT_EXISTS: //用户名不存在
      status = 400; //错误请求Bad Request
      message = '用户名不存在';
      break;
    case errorTypes.PASSWORD_IS_INCORRENT: //用户输入密码错误
      status = 400; //错误请求Bad Request
      message = '输入密码有误';
      break;
    case errorTypes.UNAUTHORIZATION: //token验证错误
      status = 401; //错误请求Bad Request
      message = '未授权，token无效';
      break;
    case errorTypes.TOKEN_IS_REQUIRED: // 必须携带token
      status = 401; //错误请求Bad Request
      message = '必须携带token';
      break;
    case errorTypes.UNPERMISSION:// 操作未授权
      status = 401;
      message = "您不具备该操作权限";
      break;
    default: //默认错误
      status = 404;
      message = 'NOT FOUND';
  }
  ctx.status = status;
  ctx.body = message;

  
}
module.exports = errorHandle;