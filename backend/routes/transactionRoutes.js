import express from 'express';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getStatistics
} from '../controllers/transactionController.js';

const router = express.Router();

// Routes
router.get('/stats', getStatistics);
router.get('/statistics', getStatistics);
router.get('/monthly', getStatistics);
router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
