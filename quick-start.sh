#!/bin/bash
# Quick start script for Finance Tracker

echo "🚀 Finance Tracker - Quick Start"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✓ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo ""

echo "================================="
echo "✅ Installation Complete!"
echo "================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Setup MongoDB:"
echo "   - Download from: https://www.mongodb.com/try/download/community"
echo "   - OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
echo ""
echo "2. Configure backend:"
echo "   - Edit backend/.env with your MongoDB URI"
echo ""
echo "3. Start the backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "4. Start the frontend (Terminal 2):"
echo "   npm run dev"
echo ""
echo "5. Open browser:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000/api"
echo ""
echo "6. Initialize categories:"
echo "   curl -X POST http://localhost:5000/api/categories/init/defaults"
echo ""
echo "Happy tracking! 💰"
