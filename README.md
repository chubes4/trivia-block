# Trivia Block - WordPress Plugin

[![WordPress](https://img.shields.io/badge/WordPress-5.9%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

A modern Gutenberg block for creating interactive trivia questions with real-time scoring and customizable result messages.

![Trivia Block Demo](https://chubes.net/trivia-block/demo.gif)

## ✨ Features

- **🎯 Interactive Questions** - Multiple choice with immediate feedback
- **📊 Real-time Scoring** - Tracks progress across all questions on a page
- **🎨 Custom Results** - Personalized messages for different score ranges
- **📱 Mobile Responsive** - Works perfectly on all devices
- **♿ Accessibility First** - Full keyboard navigation and screen reader support
- **🎭 Themeable** - CSS custom properties for easy integration
- **⚡ Performance Optimized** - Conditional asset loading and modern build process

## 🚀 Quick Start

### Installation

1. **Download** the latest release from the [releases page](https://github.com/chubes/trivia-block/releases)
2. **Upload** the plugin to your WordPress site via `Plugins > Add New > Upload`
3. **Activate** the plugin
4. **Add** "Trivia Question" blocks in the Gutenberg editor

### Development Setup

```bash
# Clone the repository
git clone https://github.com/chubes/trivia-block.git
cd trivia-block

# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build

# Create distribution package
npm run dist
```

## 📋 Usage Examples

### Basic Trivia Question

```javascript
// Add a trivia block and configure:
Question: "What year was WordPress first released?"
Options: ["2001", "2003", "2005", "2007"]
Correct: "2003"
```

### Custom Result Messages

Perfect for themed quizzes:

**🎸 Grateful Dead Trivia**
- 90%+: "☠️⚡ True Deadhead - You Know Your Way Around!"
- 70%+: "🌹 Dancing Bear - Well Versed in the Scene"
- 50%+: "🎸 Getting on the Bus - Nice Knowledge!"
- <50%: "🌻 New to the Lot - Keep Exploring!"

**🏛️ History Quiz**
- 90%+: "🏆 Time Traveler - History Scholar!"
- 70%+: "📚 History Buff - Well Read!"
- 50%+: "🤔 Getting There - Keep Learning!"
- <50%: "📖 Just Starting - Lots to Discover!"

## 🎨 Theming & Customization

The plugin uses CSS custom properties for easy theming:

```css
:root {
    /* Override these to match your theme */
    --trivia-card-bg: var(--card-background, #f8fafc);
    --trivia-border: var(--border-color, #ddd);
    --trivia-text: var(--text-color, #000);
    --trivia-accent: var(--accent, #53940b);
    --trivia-button-bg: var(--button-bg, #0b5394);
    --trivia-shadow: var(--card-shadow, 0 2px 6px rgba(0,0,0,0.08));
}
```

### Dark Mode Support

Automatically adapts to `prefers-color-scheme: dark`:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --trivia-card-bg: var(--card-background, #2a2a2a);
        --trivia-text: var(--text-color, #e5e5e5);
        /* ... more dark mode variables */
    }
}
```

## 🏗️ Architecture

### File Structure

```
trivia-block/
├── src/trivia-block/          # React components
│   ├── index.js               # Block registration
│   ├── edit.js                # Editor component
│   ├── save.js                # Save component
│   └── block.json             # Block configuration
├── assets/
│   ├── css/                   # Stylesheets
│   └── js/                    # Frontend JavaScript
├── includes/
│   └── class-trivia-block-plugin.php  # Main plugin class
├── build/                     # Compiled assets
├── dist/                      # Distribution package
└── trivia-block.php           # Main plugin file
```

### Technical Stack

- **Frontend**: React with @wordpress/scripts
- **Backend**: PHP with WordPress standards
- **Build**: Webpack via @wordpress/scripts
- **Styling**: CSS with custom properties
- **API**: WordPress REST API for analytics

## 🧪 Development

### NPM Scripts

```bash
npm run start      # Development server with hot reload
npm run build      # Production build
npm run dist       # Create distribution package
npm run lint:js    # Lint JavaScript
npm run lint:css   # Lint CSS
npm run format     # Format code
```

### WordPress Standards

This plugin follows WordPress coding standards:

- PHP: [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- JavaScript: [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- CSS: [WordPress CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/)

### Testing

```bash
# Unit tests
npm run test:unit

# E2E tests (when available)
npm run test:e2e

# PHP tests (via WordPress test suite)
phpunit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow WordPress coding standards
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure responsive design
- Maintain accessibility standards

## 📄 License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Developer**: [Chris Huber](https://chubes.net)
- **Built with**: WordPress, React, and ❤️
- **Inspired by**: The need for engaging, interactive content

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? [Open an issue](https://github.com/chubes/trivia-block/issues)!

## 🚀 Roadmap

- [ ] Question import/export functionality
- [ ] Timer-based questions
- [ ] Multiple correct answers support
- [ ] Question randomization
- [ ] Analytics dashboard
- [ ] Block patterns for common quiz types

---

**Trivia Block** - Making WordPress content more interactive, one question at a time! 🎯 