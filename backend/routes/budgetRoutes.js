import express from 'express';
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetStatus
} from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all budget routes (user-specific)
router.use(protect);

// Routes
router.get('/', getBudgets);
router.get('/status', getBudgetStatus);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
