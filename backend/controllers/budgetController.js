import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';
import Joi from 'joi';

// Validation schema
const budgetSchema = Joi.object({
  category: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).optional(),
  period: Joi.string().valid('monthly', 'yearly').optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  description: Joi.string().trim(),
  alerts: Joi.object({
    enabled: Joi.boolean(),
    threshold: Joi.number().min(0).max(100)
  })
});

// Get all budgets
export const getBudgets = async (req, res) => {
  try {
    const { month } = req.query;
    let filter = {};
    
    if (month) filter.month = month;

    const budgets = await Budget.find(filter);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create budget
export const createBudget = async (req, res) => {
  try {
    const { error, value } = budgetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if budget already exists for this category and month
    const existing = await Budget.findOne({
      category: value.category,
      month: value.month
    });

    if (existing) {
      return res.status(400).json({ error: 'Budget already exists for this category and month' });
    }

    const budget = new Budget(value);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update budget
export const updateBudget = async (req, res) => {
  try {
    const { error, value } = budgetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete budget
export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get budget status with spending
export const getBudgetStatus = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required (YYYY-MM)' });
    }

    const [year, monthNum] = month.split('-');
    const startDate = new Date(`${year}-${monthNum}-01`);
    const endDate = new Date(year, parseInt(monthNum), 0);

    const budgets = await Budget.find({ month });

    const budgetStatus = await Promise.all(
      budgets.map(async (budget) => {
        const spent = await Transaction.aggregate([
          {
            $match: {
              category: budget.category,
              type: 'expense',
              date: { $gte: startDate, $lte: endDate }
            }
          },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const spentAmount = spent[0]?.total || 0;
        const percentage = (spentAmount / budget.amount) * 100;
        const isExceeded = percentage > 100;
        const isNearLimit = percentage >= budget.alerts.threshold && !isExceeded;

        return {
          _id: budget._id,
          category: budget.category,
          budgetAmount: budget.amount,
          spentAmount,
          remainingAmount: Math.max(0, budget.amount - spentAmount),
          percentage: Math.min(percentage, 100),
          actualPercentage: percentage,
          isExceeded,
          isNearLimit,
          alerts: budget.alerts
        };
      })
    );

    res.json(budgetStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
