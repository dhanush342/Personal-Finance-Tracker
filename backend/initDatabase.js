import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-tracker';

const defaultCategories = [
  { name: 'Food & Dining', type: 'expense', color: '#FF6B6B', icon: '🍔' },
  { name: 'Transportation', type: 'expense', color: '#4ECDC4', icon: '🚗' },
  { name: 'Shopping', type: 'expense', color: '#45B7D1', icon: '🛍️' },
  { name: 'Entertainment', type: 'expense', color: '#FFA07A', icon: '🎬' },
  { name: 'Bills & Utilities', type: 'expense', color: '#98D8C8', icon: '💡' },
  { name: 'Healthcare', type: 'expense', color: '#F7DC6F', icon: '🏥' },
  { name: 'Education', type: 'expense', color: '#BB8FCE', icon: '📚' },
  { name: 'Salary', type: 'income', color: '#52C41A', icon: '💰' },
  { name: 'Freelance', type: 'income', color: '#1890FF', icon: '💼' },
  { name: 'Investment', type: 'income', color: '#722ED1', icon: '📈' },
  { name: 'Other Income', type: 'income', color: '#13C2C2', icon: '💵' },
  { name: 'Other Expense', type: 'expense', color: '#999999', icon: '📝' }
];

async function initializeDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');

    // Check if categories already exist
    const existingCategories = await Category.find({});
    
    if (existingCategories.length > 0) {
      console.log(`ℹ️  Found ${existingCategories.length} existing categories`);
      console.log('🔄 Clearing existing categories...');
      await Category.deleteMany({});
    }

    // Insert default categories
    console.log('📝 Creating default categories...');
    const categories = await Category.insertMany(defaultCategories);
    console.log(`✅ Successfully created ${categories.length} default categories!`);

    // Display created categories
    console.log('\n📋 Categories in database:');
    categories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.icon} ${cat.name} (${cat.type}) - ${cat.color}`);
    });

    console.log('\n✅ Database initialization completed successfully!');
    console.log('🚀 You can now start using the Finance Tracker API');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run initialization
initializeDatabase();
