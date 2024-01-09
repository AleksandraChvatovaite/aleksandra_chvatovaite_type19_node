const express = require('express');
const { dbQueryWithData } = require('../../helper');
const { checkUsersBody } = require('../../middleware');

const usersRouter = express.Router();

const tableName = 'users';

// POST /v1/api/auth/register registruoti vartotoja su name, email, password, role_id;
usersRouter.post('/auth/register', checkUsersBody, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, password, roleId } = req.body;
  const argArr = [name, email, password, roleId];

  const sqlCheck = `SELECT COUNT(*) FROM ${tableName} WHERE email = ?`;
  const [checkResultObj, checkError] = await dbQueryWithData(sqlCheck, [email]);

  if (checkError) {
    res.status(500).json('Server error');
    return;
  }

  if (checkResultObj[0]['COUNT(*)'] > 0) {
    res.status(400).json('User already exists');
    // reikia suzinoti kaip grazinti zinute su klaida is cia
    return;
  }

  const sql = `INSERT INTO ${tableName} (name, email, password, role_id) VALUES (?,?,?,?)`;

  const [insertResultObj, error] = await dbQueryWithData(sql, argArr);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (insertResultObj.affectedRows === 1) {
    res.status(201).json('Success');
    return;
  }

  res.status(400).json('no rows affected');
});

// POST /v1/api/auth/login - prisijungti vartotoja naudojant email ir password
usersRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // const sql = `SELECT * FROM ${tableName} WHERE email = ?`;
  const sql = `SELECT ${tableName}.email, ${tableName}.password, user_roles.user_roles_name FROM ${tableName} JOIN user_roles ON ${tableName}.role_id = user_roles.user_roles_id WHERE ${tableName}.email=?`;
  const [rows, error] = await dbQueryWithData(sql, [email]);

  console.log(error);

  if (rows.length === 0) {
    res.status(401).json({
      msg: 'Incorrect email or password',
    });
    return;
  }
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(401).json({
        msg: 'Incorrect email or password',
      });
      return;
    }
    res.json({
      msg: 'Login success',
      userRole: rows[0].user_roles_name,
    });
  }
});

module.exports = usersRouter;
