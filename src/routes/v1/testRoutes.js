const mysql = require('mysql2/promise');
const { dbConfig } = require('../../config');

async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM users LIMIT 1');
    console.log('Succesfuly connected to mysql');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
}

module.exports = testConnection;
