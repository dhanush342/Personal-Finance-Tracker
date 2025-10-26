import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Education', 'Other']
    },
    amount: {
      type: Number,
      required: true,
      positive: true
    },
    month: {
      type: String,
      required: true // Format: YYYY-MM
    },
    description: {
      type: String,
      trim: true
    },
    alerts: {
      enabled: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 80 // Percentage
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Budget', budgetSchema);
