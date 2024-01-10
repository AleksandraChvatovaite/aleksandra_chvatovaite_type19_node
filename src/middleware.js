// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

function formatErrorArr(errorsObj) {
  return errorsObj.details.map((eObj) => ({
    field: eObj.path[0],
    error: eObj.message,
  }));
}

async function checkOrderBody(req, res, next) {
  const orderSchema = Joi.object({
    userId: Joi.number().positive().integer().required(),
    shopItemId: Joi.number().positive().integer().required(),
    quantity: Joi.number().positive().integer().required(),
    totalPrice: Joi.number().positive().precision(2).required(),
    status: Joi.string().valid('unpaid', 'paid', 'cancelled').required(),
  });
  try {
    const validatonResult = await orderSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkOrderBody ===', error);
    res.status(400).json(formatErrorArr(error));
  }
}

async function checkShopItemBody(req, res, next) {
  // aprasom koks bus musu objektas
  const orderSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    itemTypeId: Joi.number().positive().integer().required(),
  });
  try {
    const validatonResult = await orderSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkShopItemBody ===', error);
    res.status(400).json(formatErrorArr(error));
  }
}

async function checkUsersBody(req, res, next) {
  const orderSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).max(30),
    roleId: Joi.number().positive().integer().required(),
  });

  try {
    const validatonResult = await orderSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkusersBody ===', error);
    res.status(400).json(formatErrorArr(error));
  }
}

module.exports = {
  checkOrderBody,
  checkShopItemBody,
  checkUsersBody,
  formatErrorArr,
};
