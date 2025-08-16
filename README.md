# Personal Portfolio

A modern, responsive personal portfolio website built with React.js and Tailwind CSS. This project showcases a clean, professional design with smooth animations, dark/light theme toggle, and optimized performance.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations and hover effects
- **Dark/Light Theme**: Toggle between themes with user preference saved in localStorage
- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Performance Optimized**: Built with Vite for fast development and optimized production builds
- **SEO Friendly**: Meta tags, structured data, and semantic HTML for better search engine visibility

### Sections

1. **Header**: Fixed navigation with logo and theme toggle
2. **Hero**: Introduction with profile photo placeholder and social links
3. **About**: Personal bio, skills visualization with animated progress bars
4. **Projects**: Portfolio showcase with project filtering and technology tags
5. **Resume**: Work experience, education, certifications with PDF download
6. **Contact**: Contact form (mailto), contact information, and social links
7. **Footer**: Site links, social media, and back-to-top functionality

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint
- **Formatting**: Prettier
- **Development**: Hot Module Replacement (HMR)

## 📁 Project Structure

```
portfolio-project/
├── public/
│   ├── favicon.svg
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── data/
│   │   ├── skills.js
│   │   └── projects.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .eslintrc.js
├── .prettierrc
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-project.git
   cd portfolio-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit** `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Personal Information

1. **Update personal details** in the following files:
   - `src/components/Hero.jsx` - Name, tagline, social links
   - `src/components/About.jsx` - Bio and personal information
   - `src/components/Contact.jsx` - Contact information
   - `src/components/Footer.jsx` - Footer details

2. **Replace the resume PDF** in `public/resume.pdf`

3. **Update project data** in `src/data/projects.js`

4. **Modify skills** in `src/data/skills.js`

### Styling

- **Colors**: Edit the color palette in `tailwind.config.js`
- **Fonts**: Update font family in `tailwind.config.js` and add imports in `index.html`
- **Layout**: Modify component styles in individual component files

### SEO

Update meta tags in `index.html`:
- Title, description, keywords
- Open Graph tags
- Twitter Card tags

## 📱 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Vercel

1. Import your project from GitHub
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### Manual Deployment

1. Run `npm run build`
2. Upload the `dist` folder contents to your web server

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 📊 Analytics (optional)

Enable Google Analytics (GA4) page view tracking:

- Create a GA4 property and copy the Measurement ID (looks like `G-XXXXXXXXXX`).
- Create a `.env` file in the project root with:
  - `VITE_GA_ID=G-XXXXXXXXXX`
- Start dev server or build/deploy. SPA route changes are tracked automatically.

See `.env.example` for the variable name.

## 🎯 Performance Features

- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Lazy loading and responsive images
- **Animation Performance**: Hardware-accelerated CSS animations
- **Bundle Size**: Optimized dependencies and tree shaking

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
- GitHub: [Your GitHub](https://github.com/yourusername)

---

⭐ If you found this portfolio template helpful, please give it a star on GitHub!
