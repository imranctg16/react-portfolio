# react-portfolio

My portfolio site: [imran-react-portfolio.netlify.app](https://imran-react-portfolio.netlify.app).

React 18, Vite and plain CSS, deployed on Netlify. One file, `resume/content.mjs`, feeds both the site and my résumé PDFs, so the two can't drift apart. The PDFs are printed with headless Chrome.

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run test:resume  # tests, and rebuilds the résumé PDFs
```
