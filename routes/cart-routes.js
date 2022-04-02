const express = require('express');

const {
  addProductToCart,
  getUserCart,
  updateCartProduct,
  deleteProductFromCart,
  purchaseCart
} = require('../controllers/cart-controllers');

const { validateSession } = require('../middlewares/auth-middleware');
const {
  addProductToCartValidations,
  validateResult
} = require('../middlewares/validators-middleware');

const { cartExists } = require('../middlewares/cart-middleware');
const { productExists } = require('../middlewares/products-middleware');

const router = express.Router();

router.use(validateSession);

router.get('/', getUserCart);

router.post(
  '/add-product',
  addProductToCartValidations,
  validateResult,
  addProductToCart
);

router.patch(
  '/update-product',
  addProductToCartValidations,
  validateResult,
  productExists,
  cartExists,
  updateCartProduct
);

router.post('/purchase', cartExists, purchaseCart);

router.delete('/:productId', cartExists, deleteProductFromCart);

module.exports = { cartRouter: router };
