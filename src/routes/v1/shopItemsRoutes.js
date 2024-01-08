const express = require('express');
const { dbQueryWithData } = require('../../helper');
const { checkShopItemBody } = require('../../middleware');

const shopItemRouter = express.Router();

const tableName = 'shop_items';

// POST /api/shop_items - sukurti parduotuves preke su name, price, description, image, item_type_id
shopItemRouter.post('/shop_items', checkShopItemBody, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, price, description, image, itemTypeId } = req.body;
  const argArr = [name, price, description, image, itemTypeId];

  const sql = `INSERT INTO ${tableName} (shop_item_name, price, description, image, item_type_id) VALUES (?,?,?,?,?)`;
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

// GET /api/shop_items gaus visus
shopItemRouter.get('/shop_items', async (req, res) => {
  const sql = `SELECT * FROM ${tableName} WHERE isArchived = 0`;
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

// GET /api/shop_items/:id gaus ta kurio nurodytas id
shopItemRouter.get('/shop_items/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const sql = `SELECT * FROM ${tableName} WHERE shop_item_id=?`;
  const [resObj, error] = await dbQueryWithData(sql, [itemId]);
  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (resObj.length === 0) {
    res.status(404).json('Not found');
    return;
  }
  console.log('res.json(resObj); ===', res.json(resObj));
});

// DELETE shop_items/:id
shopItemRouter.delete('/shop_items/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const sql = `UPDATE ${tableName} SET is_archived=1 WHERE shop_item_id=? LIMIT 1`;
  const [updateResultObj, error] = await dbQueryWithData(sql, [itemId]);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (updateResultObj.affectedRows === 1) {
    res.status(200).json({ message: `shop item with id ${itemId} was deleted` });
    return;
  }
  if (updateResultObj.length === 0) {
    res.status(404).json('Not found');
    return;
  }
  res.status(400).json('no rows affected');
});

module.exports = shopItemRouter;
