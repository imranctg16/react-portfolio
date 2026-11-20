import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { resume } from '../resume/content.mjs';
import { Row, Ext, useTitle } from './components/ui';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';
import { initGA, trackPageview } from './utils/analytics';

// The blog carries react-markdown and the post texts, so it loads only when asked for.
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

function OnNavigate() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageview(pathname + search, document.title);
  }, [pathname, search]);
  return null;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const next = theme === 'dark' ? 'light' : 'dark';
  const flip = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // private mode: the choice just lasts for this visit
    }
    setTheme(next);
  };
  return (
    <button type="button" className="theme push" onClick={flip} aria-label={`Switch to ${next} theme`}>
      {next}
    </button>
  );
}

function Header() {
  return (
    <header className="row tight first site-head">
      <div className="rail">
        <Link to="/">{resume.name}</Link>
      </div>
      <nav className="nav" aria-label="Main">
        <NavLink to="/projects">Work</NavLink>
        <NavLink to="/blog">Writing</NavLink>
        <NavLink to="/resume">Résumé</NavLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}

function Footer() {
  const { contact, site } = resume;
  return (
    <footer className="site-foot">
      <Row rail="Contact">
        <h2>Write to me</h2>
        <dl className="contact" style={{ marginTop: '1.6rem' }}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <Ext href={contact.linkedin}>Mohammad Imran Hossain</Ext>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <Ext href={site.github}>{site.github}</Ext>
            </dd>
          </div>
        </dl>
      </Row>
    </footer>
  );
}

export function NotFound() {
  useTitle('Page not found');
  return (
    <Row rail="404" className="first">
      <h1>That page is not here.</h1>
      <p className="lead" style={{ marginTop: '1rem' }}>
        <Link to="/projects">See all the work</Link> or <Link to="/">go to the start</Link>.
      </p>
    </Row>
  );
}

export default function App() {
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID;
    if (id) initGA(id);
  }, []);

  return (
    <BrowserRouter>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="page">
        <Header />
        <OnNavigate />
        <main id="main">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
