// 导入数据库连接相关
const connection = require('../app/database');

// 编写user路由下关于数据库相关的逻辑
class UserService{
  async create(user){// 供user.controller.js中的create使用
    // 将user存储到数据库中
    const { name, password } = user;
    const statement = `INSERT INTO users (name, password) VALUES(?,?);`;// 预处理语句
    const result = await connection.execute(statement, [name, password]);
    return result[0];//将存储成功的返回返回给controller中的create函数
  }
  // 查询用户
  async getUserByName(name){ //供user.middleware.js中的verifyUser使用
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  // 根据id将头像地址存储到用户表中
  async updateAvatarUrlById(avatarUrl,userId){
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl,userId]);
    return result;
  }

}

module.exports = new UserService();