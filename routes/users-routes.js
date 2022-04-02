const express = require('express');

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getUsersProducts,
  getUsersOrders,
  getOrderById
} = require('../controllers/users-controller');

const { validateSession } = require('../middlewares/auth-middleware');
const {
  userExists,
  protectUserAccount
} = require('../middlewares/users-middleware');

const router = express.Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', getAllUsers);

router.get('/me', getUsersProducts);

router.get("/orders", getUsersOrders);

router.get("/order/:id", getOrderById)

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };
