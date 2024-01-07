const express = require('express');
const { dbQueryWithData } = require('../../helper');

const usersRouter = express.Router();

const tableName = 'users';

// POST /v1/api/auth/register registruoti vartotoja su name, email, password, role_id;
usersRouter.post('/auth/register', async (req, res) => {
  const { name, email, password, roleId } = req.body;
  const argArr = [name, email, password, roleId];

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

  const sql = `SELECT * FROM ${tableName} WHERE email = ?`;
  const [rows, error] = await dbQueryWithData(sql, [email]);

  if (rows.length === 0) {
    res.status(400).json({
      msg: 'Incorrect email',
    });
    return;
  }
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(400).json({
        msg: 'Incorrect password',
      });
      return;
    }
    res.json({
      msg: 'Login success',
    });
  }
});

module.exports = usersRouter;
