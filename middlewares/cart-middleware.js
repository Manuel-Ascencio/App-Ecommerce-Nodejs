const req = require('express/lib/request');
const { Cart } = require('../models/cart-model');
const { Product } = require('../models/product-model');

const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.cartExists = catchAsync(async (re, res, next) => {
  const { currentUser } = req;

  const cart = await Cart.findOne({
    where: { status: 'active', userId: currentUser.id },
    include: [{ model: Product, through: { where: { status: 'active' } } }]
  });

  if (!cart) {
    return next(new AppError(400, 'This user does not have a cart yet'));
  }

  req.cart = cart;

  next();
});
