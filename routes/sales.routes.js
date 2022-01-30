const { Router } = require('express');
const {
  salesValidation,
  createSale,
  getSaleById,
} = require('../controllers/salesController');

const router = Router();

router.post('/', salesValidation, createSale);

router.get('/:id', getSaleById);

module.exports = { router };
