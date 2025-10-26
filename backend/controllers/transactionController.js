import Transaction from '../models/Transaction.js';
import Joi from 'joi';

// Validation schema
const transactionSchema = Joi.object({
  description: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().trim().required(),
  type: Joi.string().valid('income', 'expense').required(),
  date: Joi.date(),
  notes: Joi.string().trim(),
  paymentMethod: Joi.string().valid('cash', 'credit_card', 'debit_card', 'bank_transfer', 'other')
});

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const { category, type, startDate, endDate } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single transaction
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create transaction
export const createTransaction = async (req, res) => {
  try {
    // Validate input
    const { error, value } = transactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const transaction = new Transaction(value);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { error, value } = transactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transaction statistics
export const getStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let match = {};

    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = new Date(startDate);
      if (endDate) match.date.$lte = new Date(endDate);
    }

    const stats = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      byType: stats,
      byCategory: categoryStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
