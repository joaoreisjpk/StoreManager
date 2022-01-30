const { Router } = require('express');
const { productsValidation, productsExists, createProduct } = require(
  '../controllers/productsController',
);

const router = Router();

router.post('/', productsValidation, productsExists, createProduct);

module.exports = { router };