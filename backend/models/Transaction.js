import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    category: {
      type: String,
      required: true,
      trim: true
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

// Indexes for performance
transactionSchema.index({ user: 1, date: -1 }); // Fast queries by user and date
transactionSchema.index({ user: 1, type: 1 }); // Fast filtering by type

export default mongoose.model('Transaction', transactionSchema);
