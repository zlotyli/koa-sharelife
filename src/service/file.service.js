const connection = require('../app/database')

class FileService{
  // 在头像信息表中添加对应头像信息
  async createAvatar(filename, mimetype, size, userId){
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result;
  }
  // 查询指定用户id的头像信息--用于展示给用户
  async getAvatarByUserId(userId){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  // 将动态配图信息添加到file表中
  async createFile(filename, mimetype, size, userId, momentId){
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
    return result;
  }
  // 查询指定文件名的动态配图信息--用于展示给用户
  async getFileByFilename(filename){
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService()