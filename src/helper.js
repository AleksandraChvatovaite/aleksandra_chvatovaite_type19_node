const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

async function dbQueryWithData(sql, argArr = []) {
  let conn;
  try {
    // jungies prie DB
    conn = await mysql.createConnection(dbConfig);
    // atlieki veiksma
    const [rows] = await conn.execute(sql, argArr);
    // grazini duomenis
    return [rows, null];
  } catch (error) {
    return [null, error];
  } finally {
    // atsijungi nuo DB
    if (conn) conn.end();
  }
}

module.exports = {
  dbQueryWithData,
};
