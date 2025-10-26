import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      positive: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Education', 'Other']
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense']
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'credit_card', 'debit_card', 'bank_transfer', 'other'],
      default: 'cash'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
