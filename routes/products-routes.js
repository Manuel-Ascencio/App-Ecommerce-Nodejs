const express = require('express');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products-controller');

const { validateSession } = require('../middlewares/auth-middleware');
const {
  productExists,
  productOwner
} = require('../middlewares/products-middleware');
const {
  productValidations,
  validateResult
} = require('../middlewares/validators-middleware');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllProducts)
  .post(productValidations, validateResult, createProduct);

router
  .use('/:id', productExists)
  .route('/:id')
  .get(getProductById)
  .patch(productOwner, updateProduct)
  .delete(productOwner, deleteProduct);

module.exports = { productRouter: router };
