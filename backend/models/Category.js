import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
      default: 'expense'
    },
    icon: {
      type: String,
      default: '📁'
    },
    color: {
      type: String,
      default: '#808080'
    },
    description: {
      type: String,
      trim: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
