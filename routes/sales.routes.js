const { Router } = require('express');
const {
  salesValidation,
  createSale,
  getSaleById,
  getAllSales,
  removeSale,
} = require('../controllers/salesController');

const router = Router();

router.post('/', salesValidation, createSale);

router.get('/:id', getSaleById);

router.get('/', getAllSales);

router.put('/:id', salesValidation, getAllSales);

router.delete('/:id', removeSale);

module.exports = { router };
