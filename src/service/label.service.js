const connection = require('../app/database');

class LabelService{
  // 向标签表中添加标签
  async create(name){
    const statement = `INSERT INTO label (name) VALUES(?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  // 判断标签表中是否含有该标签
  async getLabelByName(name){
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  // 展示所有标签--规定limit和offset
  async getLabels(limit, offset){
    const statement = `SELECT * FROM label LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new LabelService()