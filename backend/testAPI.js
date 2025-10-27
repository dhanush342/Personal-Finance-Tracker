// Auth-aware API test script to verify endpoints end-to-end
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

function yyyyMm(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

async function ensureAuth() {
  const email = `demo+${Date.now()}@local.test`;
  const password = 'password123';
  const name = 'Demo User';

  try {
    const reg = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
    return reg.data.token;
  } catch (err) {
    // If already exists, login
    const login = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return login.data.token;
  }
}

async function testAPI() {
  console.log('🧪 Testing Finance Tracker API (with auth)...\n');

  try {
    // 1) Health Check
    console.log('1️⃣  Testing Health Endpoint...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // 2) Authenticate and set token
    console.log('2️⃣  Authenticating (register/login)...');
    const token = await ensureAuth();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('✅ Authenticated');
    console.log('');

    // 3) Get Categories (public)
    console.log('3️⃣  Testing Get Categories...');
    const categoriesResponse = await axios.get(`${API_BASE}/categories`);
    console.log(`✅ Found ${categoriesResponse.data.length} categories`);
    const categoryName = categoriesResponse.data.find(c => c.type === 'expense')?.name || 'Food & Dining';
    console.log('   Using category:', categoryName);
    console.log('');

    // 4) Create Transaction (protected)
    console.log('4️⃣  Testing Create Transaction...');
    const newTransaction = {
      type: 'expense',
      amount: 45.5,
      category: categoryName,
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

    // 5) Get Transactions (protected)
    console.log('5️⃣  Testing Get Transactions...');
    const transactionsResponse = await axios.get(`${API_BASE}/transactions`);
    console.log(`✅ Found ${transactionsResponse.data.length} transaction(s)`);
    console.log('');

    // 6) Get Transaction Statistics (protected)
    console.log('6️⃣  Testing Transaction Statistics...');
    const statsResponse = await axios.get(`${API_BASE}/transactions/statistics`);
    console.log('✅ Raw Statistics:', statsResponse.data);
    console.log('');

    // 7) Create Budget (protected)
    console.log('7️⃣  Testing Create Budget...');
    const month = yyyyMm();
    const newBudget = {
      category: categoryName,
      amount: 500,
      period: 'monthly',
      month
    };
    try {
      const budgetResponse = await axios.post(`${API_BASE}/budgets`, newBudget);
      console.log('✅ Created Budget:', {
        id: budgetResponse.data._id,
        category: budgetResponse.data.category,
        amount: budgetResponse.data.amount,
        period: budgetResponse.data.period,
        month: budgetResponse.data.month
      });
    } catch (e) {
      if (e.response?.status === 400) {
        console.log('ℹ️  Budget may already exist for this category/month; continuing.');
      } else {
        throw e;
      }
    }
    console.log('');

    // 8) Get Budgets (protected)
    console.log('8️⃣  Testing Get Budgets...');
    const budgetsResponse = await axios.get(`${API_BASE}/budgets?month=${month}`);
    console.log(`✅ Found ${budgetsResponse.data.length} budget(s) for ${month}`);
    console.log('');

    // 9) Budget Status (protected)
    console.log('9️⃣  Testing Budget Status...');
    const statusResponse = await axios.get(`${API_BASE}/budgets/status?month=${month}`);
    console.log('✅ Budget Status sample:', statusResponse.data[0] || {});
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

// Give the dev server a moment to boot if needed
console.log('⏳ Waiting for server to be ready...');
setTimeout(() => {
  testAPI();
}, 2000);
