const express = require('express');
const { dbQueryWithData } = require('../../helper');

const userRolesRouter = express.Router();

const tableName = 'user_roles';

// GET /api/user_roles - gauti visas roles
userRolesRouter.get('/user_roles', async (req, res) => {
  const sql = `SELECT * FROM ${tableName}`;
  const [shopItems, error] = await dbQueryWithData(sql);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (shopItems.length === 0) {
    res.status(404).json('Not found');
    return;
  }
  res.json(shopItems);
});

module.exports = userRolesRouter;
