#!/bin/bash

# Kill any process using port 5001
echo "🔧 Checking port 5001..."
lsof -ti:5001 | xargs kill -9 2>/dev/null
sleep 1

# Start the server
echo "🚀 Starting backend server on port 5001..."
npm start

