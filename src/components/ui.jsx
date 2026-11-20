import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects.mjs';

const SITE = 'Mohammad Imran Hossain';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Senior Full-Stack Engineer`;
  }, [title]);
}

// One ledger line: label in the rail, content to the right of the rule.
export function Row({ rail, className = '', children }) {
  return (
    <section className={`row ${className}`}>
      <div className="rail">{typeof rail === 'string' && !className ? <h2 className="rail-title">{rail}</h2> : rail}</div>
      <div className="content">{children}</div>
    </section>
  );
}

export const ext = (url) => (url.startsWith('http') ? url : `https://${url}`);

export function Ext({ href, children }) {
  return (
    <a href={ext(href)} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const two = (n) => String(n).padStart(2, '0');

export function ProjectIndex({ items }) {
  return (
    <ol className="index">
      {items.map((p) => (
        <li key={p.id}>
          <Link className="item" to={`/project/${p.id}`}>
            <span className="n">{two(projects.indexOf(p) + 1)}</span>
            <span>
              <span className="t">
                {p.title}
                <i aria-hidden="true">→</i>
              </span>
              <span className="l" style={{ display: 'block' }}>{p.line}</span>
            </span>
            <span className="m">
              <b>{p.status || p.period}</b>
              {p.org || p.role}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function Shot({ image, eager }) {
  return (
    <figure className="shot">
      <img src={image.src} width={image.w} height={image.h} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}
