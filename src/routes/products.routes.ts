import { Router } from 'express';
import {
  productsValidation,
  productAlreadyExists,
  createProduct,
  getProductById,
  getAllProducts,
  productDontExists,
  editProduct,
  deleteProduct,
} from '../controllers/productsController';

const router = Router();

router.post('/', productsValidation, productAlreadyExists, createProduct);

router.get('/:id', getProductById);

router.get('/', getAllProducts);

router.put('/:id', productsValidation, productDontExists, editProduct);

router.delete('/:id', productDontExists, deleteProduct);

export default router;
