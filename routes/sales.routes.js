const { Router } = require('express');
const { salesValidation, createSale } = require('../controllers/salesController');

const router = Router();

router.post('/', salesValidation, createSale);

module.exports = { router };