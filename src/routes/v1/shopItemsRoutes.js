const express = require('express');
const { dbQueryWithData } = require('../../helper');

const shopItemRouter = express.Router();

const tableName = 'shop_items';

// POST /api/shop_items - sukurti parduotuves preke su name, price, description, image, item_type_id
shopItemRouter.post('/pets', async (req, res) => {
  const { name, dob, clientEmail } = req.body;
  const argArr = [name, dob, clientEmail];

  const sql = `INSERT INTO ${tableName} (name, dob, client_email) VALUES (?,?,?)`;

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

module.exports = shopItemRouter;
