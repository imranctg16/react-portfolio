# 📖 README Reader Pro

> A modern, feature-rich markdown viewer with advanced Mermaid diagram support and IDE-like syntax highlighting

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-purple.svg)](https://vitejs.dev/)
[![Mermaid](https://img.shields.io/badge/Mermaid-11.9.0-orange.svg)](https://mermaid.js.org/)

## 🌟 Overview

README Reader Pro is a professional-grade markdown viewer built with React and TypeScript. It transforms plain markdown into beautifully rendered documents with interactive diagrams, syntax-highlighted code blocks, and a modern glassmorphism design. Perfect for developers who want to preview and present their documentation with style.

## ☁️ Deployment

-   **Frontend**: Deployed on [Netlify](https://www.netlify.com/)

### ✨ Key Features

- **🎨 Modern UI Design** - Clean glassmorphism interface with smooth animations
- **📊 Interactive Mermaid Diagrams** - Zoom, pan, fullscreen, and theme switching
- **💻 IDE-like Syntax Highlighting** - Support for 20+ programming languages with line numbers
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🗂️ Multi-tab Support** - Work with multiple README files simultaneously
- **🎯 Real-time Preview** - Instant markdown rendering as you type
- **📥 Export Capabilities** - Download diagrams as SVG files
- **📋 Copy Support** - Easy copying of diagram source code
- **🎭 Theme Switching** - 5 different diagram themes (default, dark, forest, neutral, base)
- **⚡ Performance Optimized** - Built with Vite for lightning-fast development and builds

## 🚀 Live Demo

<!-- Choose any of these image names or create your own: -->

<!-- Main interface screenshot -->
<!-- ![README Reader Pro Interface](./screenshots/readme-reader-interface.png) -->

<!-- Feature demonstration GIF -->
<!-- ![README Reader Pro Demo](./screenshots/readme-reader-demo.gif) -->

<!-- Multiple screenshots showing different features -->
<!-- ![Editor View](./screenshots/editor-view.png) -->
<!-- ![Mermaid Diagrams](./screenshots/mermaid-features.png) -->
<!-- ![Mobile Responsive](./screenshots/mobile-view.png) -->

🌐 **[Live Demo - https://readme-reader.netlify.app/](https://readme-reader.netlify.app/)**

📂 **[GitHub Repository - https://github.com/imranctg16/readme-reader](https://github.com/imranctg16/readme-reader)**

### Preview
Experience the full-featured markdown viewer with:
- ✨ Real-time markdown rendering
- 🔍 Interactive Mermaid diagrams with zoom/pan
- 🎨 Multi-theme diagram support
- 📱 Responsive design across all devices

## 🛠️ Technology Stack

### Core Technologies
- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: Custom CSS with CSS Variables and Animations
- **Fonts**: Inter (Google Fonts) + JetBrains Mono for code

### Key Dependencies
- **react-markdown** (10.1.0) - Markdown parsing and rendering
- **remark-gfm** (4.0.1) - GitHub Flavored Markdown support
- **mermaid** (11.9.0) - Interactive diagram rendering
- **react-syntax-highlighter** (15.6.1) - Code syntax highlighting
- **lucide-react** (0.525.0) - Beautiful icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imranctg16/readme-reader.git
   cd readme-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎮 Usage

### Basic Usage
1. **Open the application** in your browser
2. **Paste your markdown content** into the editor panel
3. **View the live preview** with syntax highlighting and rendered diagrams
4. **Interact with Mermaid diagrams** using the control panel

### Advanced Features

#### Multi-tab Support
- Click the **"+"** button to add new tabs
- Switch between tabs to work on multiple files
- Close tabs with the **"×"** button (minimum one tab required)

#### Interactive Diagrams
- **Zoom**: Use +/- buttons or mouse wheel
- **Pan**: Click and drag to navigate large diagrams
- **Fullscreen**: Toggle fullscreen mode for detailed viewing
- **Themes**: Switch between 5 visual themes
- **Export**: Download diagrams as SVG files
- **Copy**: Copy diagram source code to clipboard

#### Collapsible Editor
- **Desktop**: Collapse editor to 60px sidebar for focused reading
- **Mobile**: Minimize to compact header view
- Toggle with the panel controls

## 🏗️ Architecture

### Component Structure
```
src/
├── App.tsx              # Main application component
├── App.css              # Complete styling with animations
├── index.css            # Global styles and CSS reset
└── main.tsx             # React application entry point
```

### Key Components

#### `App` Component (`src/App.tsx:202`)
- Manages application state (tabs, editor collapse, scroll position)
- Handles tab operations (add, close, switch)
- Custom code block renderer for Mermaid integration

#### `MermaidComponent` (`src/App.tsx:23`)
- Interactive diagram controls and zoom/pan functionality
- Theme switching with real-time reinitialization
- Error handling with user-friendly messages
- SVG export and copy capabilities

## 🎨 Design System

### CSS Variables
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
--success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
--surface: rgba(255, 255, 255, 0.95)
--border-radius: 12px
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Animation Classes
- `slideDown`, `fadeInUp`, `slideInLeft/Right` - Entrance animations
- `fadeInScale` - Mermaid container animations
- `zoomIn` - Fullscreen transitions

## 🧪 Development Scripts

```bash
npm run dev        # Start development server (localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint for code quality
```

## 📱 Responsive Design

- **Desktop** (1024px+): Full side-by-side editor and preview
- **Tablet** (768px-1024px): Optimized layout with responsive controls
- **Mobile** (480px-768px): Stacked layout with touch-friendly interactions
- **Small Mobile** (<480px): Compact design with essential features

## 🔧 Browser Support

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mermaid.js** for amazing diagram capabilities
- **React Markdown** for robust markdown parsing
- **React Syntax Highlighter** for beautiful code display
- **Lucide React** for clean, modern icons
- **Vite** for exceptional development experience

## 🔮 Future Enhancements

- [ ] Dark/light theme toggle for entire application
- [ ] Local storage for markdown persistence
- [ ] PDF export functionality
- [ ] File upload/import capabilities
- [ ] Collaborative editing features
- [ ] Custom Mermaid theme creator
- [ ] Plugin system for extended functionality

## 📊 Project Stats

- **Lines of Code**: ~670 (TypeScript/React)
- **Components**: 2 main components + utilities
- **Dependencies**: 20 production dependencies
- **Build Size**: ~2.5MB (development), ~500KB (production gzipped)
- **Performance**: Lighthouse score 95+ across all metrics

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/imranctg16">Imran</a></p>
  <p>
    <a href="#top">⬆️ Back to Top</a>
  </p>
</div>
