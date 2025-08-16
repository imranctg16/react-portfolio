# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on port 3000 with auto-reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint on `src/` directory
- `npm run lint:fix` - Auto-fix ESLint errors
- `npm run format` - Format code with Prettier

## Project Architecture

This is a React-based personal portfolio website built with modern web technologies.

### Tech Stack
- **Frontend**: React 18 with JSX
- **Design System**: Glassmorphism with frosted glass effects and backdrop blur
- **Styling**: Material-UI (MUI) components + Tailwind CSS
- **Theme System**: Custom light/dark theme implementation with MUI ThemeProvider
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Material-UI icons for consistent design
- **Build Tool**: Vite with hot module replacement
- **Deployment**: Static build targeting Netlify/Vercel

### Core Architecture Patterns

#### Theme Management
The app uses a sophisticated theme system with glassmorphism design:
- `src/contexts/ThemeContext.jsx` - Global theme state management
- `src/theme/theme.js` - MUI theme definitions with indigo/orange/purple color palette
- Theme preference persisted in localStorage with system preference fallback
- All components use MUI's theme-aware styling
- Color scheme: Primary (#6366f1), Secondary (#f59e0b), Accent (#8b5cf6)

#### Component Structure
- **Layout Components**: Header (fixed nav with glassmorphism), Footer
- **Page Sections**: Hero, About, Skills, Projects, Contact (all single-page)
- **Data-Driven**: Projects and skills stored in component state
- **Design System**: Glassmorphism cards, buttons, and navigation with backdrop blur
- **Alignment System**: Perfect alignment utilities with consistent spacing

#### State Management
- Context API for global theme state
- Local component state for UI interactions
- No complex state management library (Redux, Zustand) needed

### Key Files and Directories

#### Configuration
- `vite.config.js` - Vite build configuration (port 3000, React plugin)
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins (Tailwind, Autoprefixer)

#### Data Sources
- `src/data/projects.js` - Project portfolio data with detailed metadata
- `src/data/skills.js` - Skills and technologies data
- `public/resume.pdf` - Downloadable resume file

#### Core Components
- `src/App.jsx` - Main app structure with glassmorphism background
- `src/components/Hero.jsx` - Hero section with gradient text animations
- `src/components/About.jsx` - About section with stats cards and fun facts
- `src/components/Skills.jsx` - Skills showcase with progress bars and colorful cards
- `src/components/Projects.jsx` - Portfolio showcase with glassmorphism cards
- `src/components/Contact.jsx` - Contact form with social links
- `src/components/FunBackgroundDemo.jsx` - Interactive background effects demo (9 options including fireflies)

### Development Notes

#### Styling Approach
The project uses a hybrid styling approach with glassmorphism design:
- MUI components for complex UI elements (buttons, cards, typography)
- Tailwind CSS for layout, spacing, and glassmorphism utilities
- Custom glassmorphism classes: `.glass-card`, `.glass-nav`, `.glass-button`
- Theme-aware colors and typography defined in MUI theme
- Backdrop blur effects and subtle transparency throughout

#### Glassmorphism Design System
Key design elements implemented:
- **Glass Cards**: Semi-transparent backgrounds with backdrop blur
- **Smooth Animations**: Framer Motion for micro-interactions and hover effects
- **Color Gradients**: Animated text gradients and background effects
- **Perfect Alignment**: Consistent spacing system across all sections
- **Theme Integration**: Dark/light mode with glassmorphism adapting to theme
- **Background Effects**: Optional fun background effects (fireflies, bubbles, etc.)

#### Performance Considerations
- Vite for fast development and optimized production builds
- Component-based architecture for efficient re-rendering
- Static asset optimization through Vite's build process