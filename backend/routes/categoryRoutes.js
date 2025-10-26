import express from 'express';
import {
  getCategories,
  getDefaultCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  initializeDefaultCategories
} from '../controllers/categoryController.js';

const router = express.Router();

// Routes
router.get('/', getCategories);
router.get('/defaults', getDefaultCategories);
router.post('/', createCategory);
router.post('/init/defaults', initializeDefaultCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
