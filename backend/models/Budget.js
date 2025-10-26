import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      positive: true
    },
    period: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    month: {
      type: String // Format: YYYY-MM (optional for backward compatibility)
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
