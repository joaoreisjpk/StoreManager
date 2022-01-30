const { Router } = require('express');
const {
  salesValidation,
  createSale,
  getSaleById,
  getAllSales,
} = require('../controllers/salesController');

const router = Router();

router.post('/', salesValidation, createSale);

router.get('/:id', getSaleById);

router.get('/', getAllSales);

module.exports = { router };
