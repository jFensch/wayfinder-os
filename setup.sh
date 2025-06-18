#!/bin/bash

echo "🌟 Booting up Wayfinder OS..."

# Step 1: Install dependencies with Bun
echo "📦 Installing dependencies with Bun..."
bun install

# Step 2: Start the development server
echo "🚀 Starting dev server at http://localhost:3000 ..."
bun run dev

# Optional: Initialize Git if not already present
if [ ! -d ".git" ]; then
  echo "🔧 Setting up Git..."
  git init
  git add .
  git commit -m 'Initial Wayfinder OS setup'
fi

echo "✅ Setup complete. Flow state engaged."