const Koa = require('koa');
// 导入解析post请求body中json数据
const bodyParser = require('koa-bodyparser')
// 导入user路由
const userRouter = require('../router/user.router');
// 导入auth路由
const authRouter = require('../router/auth.router');
// 导入错误的回调函数
const errorHandle = require('./error-handle');
// 导入注册路由的函数
const useRoutes = require('../router');

const app = new Koa();
app.useRoutes = useRoutes;

// 应用解析json数据的中间件
app.use(bodyParser())
// 注册对应router
app.useRoutes();
// 错误的处理逻辑
app.on('error', errorHandle)

module.exports = app;

