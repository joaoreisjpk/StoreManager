const { Router } = require('express');
const {
  salesValidation,
  createSale,
  getSaleById,
  getAllSales,
  editSale,
  removeSale,
} = require('../controllers/salesController');

const router = Router();

router.post('/', salesValidation, createSale);

router.get('/:id', getSaleById);

router.get('/', getAllSales);

router.put('/:id', salesValidation, editSale);

router.delete('/:id', removeSale);

module.exports = { router };
