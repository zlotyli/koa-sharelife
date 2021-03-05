const connection = require('../app/database');

//定义一些权限相关的查询
class AuthService {
  // 定义检测动态是否具有修改权限
  
  async checkResource (tableName, id, userId) {
    // 权限有无：通过动态/评论id和用户id可以查询到一条数据时---有权限
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [id, userId]); 

    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService()