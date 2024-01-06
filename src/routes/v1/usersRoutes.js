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

module.exports = usersRouter;
