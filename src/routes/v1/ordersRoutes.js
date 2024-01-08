const express = require('express');
const { dbQueryWithData } = require('../../helper');
const { checkOrderBody } = require('../../middleware');

const ordersRouter = express.Router();

const tableName = 'orders';

// POST /api/orders - sukurti uzsakyma su user_id, shop_item_id, quantity, total_price, status
ordersRouter.post('/orders', checkOrderBody, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { userId, shopItemId, quantity, totalPrice, status } = req.body;
  const argArr = [userId, shopItemId, quantity, totalPrice, status];
  const sql = `INSERT INTO ${tableName} (user_id, shop_item_id, quantity, total_price, status) VALUES (?,?,?,?,?)`;
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

// GET /api/orders - gauti uzsakymus su vartotojo vardu ir prekes pavadinimu bei vieneto kaina
ordersRouter.get('/orders', async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const sql = 'SELECT orders.order_id, users.name, shop_items.shop_item_name, shop_items.price FROM orders JOIN users ON orders.user_id = users.user_id JOIN shop_items ON orders.shop_item_id = shop_items.shop_item_id';
  const [resultObj, error] = await dbQueryWithData(sql);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (resultObj.length === 0) {
    res.status(404).json('Not found');
    return;
  }
  res.json(resultObj);
});

// GET /api/orders/id/:id - gauti uzsakyma pagal id
ordersRouter.get('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  // eslint-disable-next-line object-curly-newline
  const sql = 'SELECT orders.order_id, users.name, shop_items.shop_item_name, orders.quantity, orders.total_price, orders.status FROM orders JOIN users ON orders.user_id = users.user_id JOIN shop_items ON orders.shop_item_id = shop_items.shop_item_id WHERE orders.order_id=?';
  const [resultObj, error] = await dbQueryWithData(sql, [orderId]);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (resultObj.length === 0) {
    res.status(404).json('Not found');
    return;
  }
  res.json(resultObj);
});

// GET /api/orders/user/:userId - visus uzsakymus, su vart.vardui ir prekes pav , kaina
ordersRouter.get('/orders/user/:userId', async (req, res) => {
  const { userId } = req.params;
  // eslint-disable-next-line object-curly-newline
  const sql = 'SELECT orders.order_id, users.name, shop_items.shop_item_name, orders.quantity, orders.total_price, orders.status, shop_items.price FROM orders JOIN users ON orders.user_id = users.user_id JOIN shop_items ON orders.shop_item_id = shop_items.shop_item_id WHERE orders.order_id=?';
  const [resultObj, error] = await dbQueryWithData(sql, [userId]);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Server error');
    return;
  }
  if (resultObj.length === 0) {
    res.status(404).json('Not found');
    return;
  }
  res.json(resultObj);
});

module.exports = ordersRouter;
