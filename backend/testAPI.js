// Test script to verify API endpoints
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Finance Tracker API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣  Testing Health Endpoint...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Get Categories
    console.log('2️⃣  Testing Get Categories...');
    const categoriesResponse = await axios.get(`${API_BASE}/categories`);
    console.log(`✅ Found ${categoriesResponse.data.length} categories`);
    categoriesResponse.data.slice(0, 3).forEach(cat => {
      console.log(`   ${cat.icon} ${cat.name} (${cat.type})`);
    });
    console.log('');

    // Test 3: Create Transaction
    console.log('3️⃣  Testing Create Transaction...');
    const newTransaction = {
      type: 'expense',
      amount: 45.50,
      category: 'Food & Dining',
      description: 'Lunch at restaurant',
      date: new Date().toISOString()
    };
    const transactionResponse = await axios.post(`${API_BASE}/transactions`, newTransaction);
    console.log('✅ Created Transaction:', {
      id: transactionResponse.data._id,
      type: transactionResponse.data.type,
      amount: transactionResponse.data.amount,
      category: transactionResponse.data.category
    });
    console.log('');

    // Test 4: Get Transactions
    console.log('4️⃣  Testing Get Transactions...');
    const transactionsResponse = await axios.get(`${API_BASE}/transactions`);
    console.log(`✅ Found ${transactionsResponse.data.length} transaction(s)`);
    console.log('');

    // Test 5: Get Transaction Statistics
    console.log('5️⃣  Testing Transaction Statistics...');
    const statsResponse = await axios.get(`${API_BASE}/transactions/stats`);
    console.log('✅ Statistics:', {
      totalIncome: statsResponse.data.totalIncome,
      totalExpense: statsResponse.data.totalExpense,
      balance: statsResponse.data.balance,
      transactionCount: statsResponse.data.transactionCount
    });
    console.log('');

    // Test 6: Create Budget
    console.log('6️⃣  Testing Create Budget...');
    const newBudget = {
      category: 'Food & Dining',
      amount: 500,
      period: 'monthly',
      startDate: new Date().toISOString()
    };
    const budgetResponse = await axios.post(`${API_BASE}/budgets`, newBudget);
    console.log('✅ Created Budget:', {
      id: budgetResponse.data._id,
      category: budgetResponse.data.category,
      amount: budgetResponse.data.amount,
      period: budgetResponse.data.period
    });
    console.log('');

    // Test 7: Get Budgets
    console.log('7️⃣  Testing Get Budgets...');
    const budgetsResponse = await axios.get(`${API_BASE}/budgets`);
    console.log(`✅ Found ${budgetsResponse.data.length} budget(s)`);
    console.log('');

    console.log('🎉 All API tests passed successfully!');
    console.log('\n✅ Your Finance Tracker API is fully operational!');
    
  } catch (error) {
    console.error('❌ API Test Failed:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    } else if (error.request) {
      console.error('   No response received. Is the server running on port 5000?');
    } else {
      console.error('   Error:', error.message);
    }
    process.exit(1);
  }
}

// Check if server is ready
console.log('⏳ Waiting for server to be ready...');
setTimeout(() => {
  testAPI();
}, 2000);
