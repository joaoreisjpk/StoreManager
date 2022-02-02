import { Router } from 'express';
import {
  salesValidation,
  createSale,
  getSaleById,
  getAllSales,
  editSale,
  removeSale,
} from '../controllers/salesController';

const router = Router();

router.post('/', salesValidation, createSale);

router.get('/:id', getSaleById);

router.get('/', getAllSales);

router.put('/:id', salesValidation, editSale);

router.delete('/:id', removeSale);

export default router;
