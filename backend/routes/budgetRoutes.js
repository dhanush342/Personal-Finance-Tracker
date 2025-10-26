import express from 'express';
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetStatus
} from '../controllers/budgetController.js';

const router = express.Router();

// Routes
router.get('/', getBudgets);
router.get('/status', getBudgetStatus);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
