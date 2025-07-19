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
- **Styling**: Material-UI (MUI) components + Tailwind CSS
- **Theme System**: Custom light/dark theme implementation with MUI ThemeProvider
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icons
- **Build Tool**: Vite with hot module replacement
- **Deployment**: Static build targeting Netlify/Vercel

### Core Architecture Patterns

#### Theme Management
The app uses a sophisticated theme system:
- `src/contexts/ThemeContext.jsx` - Global theme state management
- `src/theme/theme.js` - MUI theme definitions (light/dark modes)
- Theme preference persisted in localStorage with system preference fallback
- All components use MUI's theme-aware styling

#### Component Structure
- **Layout Components**: Header (fixed nav), Footer
- **Page Sections**: Hero, About, Projects, Resume, Contact (all single-page)
- **Data-Driven**: Projects and skills stored in `src/data/` as JavaScript modules
- **Routing**: Uses react-router-dom for project detail navigation

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
- `src/App.jsx` - Main app structure with all page sections
- `src/components/Projects.jsx` - Portfolio showcase with filtering
- `src/components/ProjectDetail.jsx` - Detailed project view component

### Development Notes

#### Styling Approach
The project uses a hybrid styling approach:
- MUI components for complex UI elements (buttons, cards, typography)
- Tailwind CSS for layout, spacing, and custom styling
- Theme-aware colors and typography defined in MUI theme

#### Project Data Structure
Projects in `src/data/projects.js` have rich metadata including:
- Technical details (architecture, metrics, challenges)
- Project status and team information
- Detailed feature lists and technical highlights
- Used for both project cards and detailed project pages

#### Performance Considerations
- Vite for fast development and optimized production builds
- Component-based architecture for efficient re-rendering
- Static asset optimization through Vite's build process