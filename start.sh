#!/bin/bash

# macOS Menubar Counter App - Development Runner
echo "🚀 Starting macOS Menubar Counter App..."

# Get the project root directory
PROJECT_ROOT=$(pwd)

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."

# Install Next.js dependencies
echo "Installing Next.js dependencies..."
cd "$PROJECT_ROOT/nextjs-ui" && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Next.js dependencies"
    exit 1
fi

# Install Electron dependencies
echo "Installing Electron dependencies..."
cd "$PROJECT_ROOT/electron" && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Electron dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "🚀 Starting the application..."
echo ""

# Start Next.js dev server in background
echo "📱 Starting Next.js development server..."
cd "$PROJECT_ROOT/nextjs-ui" && npm run dev &
NEXTJS_PID=$!

# Wait a moment for Next.js to start
sleep 3

# Start Electron app
echo "⚡ Starting Electron app..."
cd "$PROJECT_ROOT/electron" && npm run dev &
ELECTRON_PID=$!

echo ""
echo "✅ Application started successfully!"
echo "📱 Look for the menubar icon in your macOS menubar!"
echo "🖱️ Click the icon to open the automation app"
echo ""
echo "🛑 To stop the application, press Ctrl+C"

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping application..."
    kill $NEXTJS_PID 2>/dev/null
    kill $ELECTRON_PID 2>/dev/null
    echo "✅ Application stopped"
    exit 0
}

# Trap interrupt signal to cleanup processes
trap cleanup INT

# Wait for user to interrupt
wait
