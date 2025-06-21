#!/bin/bash
set -e

PLUGIN_SLUG="trivia-block"
DIST_DIR="dist"

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf "$DIST_DIR"
mkdir "$DIST_DIR"

# Build assets first
echo "🔨 Building assets..."
npm run build

# Copy only production files
echo "📦 Copying production files..."
rsync -av --exclude='node_modules' \
          --exclude='src' \
          --exclude='.git' \
          --exclude='.DS_Store' \
          --exclude='.gitignore' \
          --exclude='.cursor' \
          --exclude='*.log' \
          --exclude='webpack.config.js' \
          --exclude='package.json' \
          --exclude='package-lock.json' \
          --exclude='build-dist.sh' \
          --exclude='dist' \
          --exclude='*.zip' \
          --exclude='README.md' \
          --exclude='readme.txt' \
          ./ "$DIST_DIR/$PLUGIN_SLUG"

# Clean up development files that might have been copied
echo "🧽 Cleaning up development files..."
rm -rf "$DIST_DIR/$PLUGIN_SLUG/src"
rm -rf "$DIST_DIR/$PLUGIN_SLUG/node_modules"

# Create a readme for the distribution
echo "📝 Creating distribution README..."
cat > "$DIST_DIR/$PLUGIN_SLUG/README.md" << 'EOF'
# Trivia Block

A Gutenberg block for creating interactive trivia questions with real-time scoring and customizable result messages.

## Features

- Interactive multiple choice questions
- Real-time scoring across all questions on a page
- Customizable result messages for different score ranges
- Mobile responsive design
- Accessibility support
- Clean, modern interface

## Installation

1. Upload the trivia-block folder to /wp-content/plugins/
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Add trivia blocks to your posts and pages using the Gutenberg editor

## Usage

1. Add a "Trivia Question" block in the Gutenberg editor
2. Enter your question and answer options
3. Designate the correct answer
4. Customize result messages in the block settings (applies to all trivia blocks on the page)
5. Publish and let users test their knowledge!

## Author

Created by Chris Huber (https://chubes.net)

## Version

1.0.0
EOF

# Zip it up
echo "🗜️ Zipping plugin..."
cd "$DIST_DIR"
zip -r "${PLUGIN_SLUG}.zip" "$PLUGIN_SLUG"
cd ..

echo "✅ Build complete: $DIST_DIR/${PLUGIN_SLUG}.zip"
echo "📁 Distribution folder: $DIST_DIR/$PLUGIN_SLUG"
echo "🚀 Ready for WordPress upload!" 