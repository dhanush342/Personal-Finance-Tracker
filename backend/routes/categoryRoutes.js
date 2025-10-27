import express from 'express';
import {
  getCategories,
  getDefaultCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  initializeDefaultCategories
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (read-only)
router.get('/', getCategories);
router.get('/defaults', getDefaultCategories);

// Protected routes (write operations - admin/authenticated users only)
router.post('/', protect, createCategory);
router.post('/init/defaults', initializeDefaultCategories); // Can be public for initial setup
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;
