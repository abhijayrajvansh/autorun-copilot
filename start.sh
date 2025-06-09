#!/bin/bash

# macOS Menubar Counter App - Development Runner
echo "🚀 Starting macOS Menubar Counter App..."

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
cd nextjs-ui && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Next.js dependencies"
    exit 1
fi

# Install Electron dependencies
echo "Installing Electron dependencies..."
cd ../electron && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Electron dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "🎯 To run the app:"
echo "1. In Terminal 1, run: cd nextjs-ui && npm run dev"
echo "2. In Terminal 2, run: cd electron && npm run dev"
echo ""
echo "📱 Look for the menubar icon in your macOS menubar!"
echo "🖱️ Click the icon to open the counter app"
echo "🖱️ Right-click the icon for menu options"
