import { Link } from 'react-router-dom';
import { resume } from '../../resume/content.mjs';
import { projects, openSource, aiWork } from '../data/projects.mjs';
import { projectImages } from '../data/projectImages';
import { Row, ProjectIndex, Shot, useTitle } from '../components/ui';

const [role, ...stack] = resume.headline.split(' · ');
const now = resume.experience[0];
const inGroup = (g) => projects.filter((p) => p.group === g);

export function Skills() {
  return (
    <dl className="skills">
      {resume.skills.map((s) => (
        <div key={s.label} style={{ display: 'contents' }}>
          <dt>{s.label}</dt>
          <dd>{s.items}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  useTitle();
  const { summary, site } = resume;
  return (
    <>
      <Row rail={null}>
        <div className="hero">
          <div>
            <p className="who">
              <b>{resume.name}</b> · {role}
            </p>
            <h1>{site.tagline}</h1>
            <p className="lead measure">{summary[0]}</p>
          </div>
          <img
            className="portrait"
            src="/headshot.jpg"
            width="480"
            height="480"
            alt={`Portrait of ${resume.name}`}
          />
        </div>
        <dl className="facts">
          <div>
            <dt>Now</dt>
            <dd>
              {now.title} at {now.company}
              <br />
              <span className="muted">{now.context}</span>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{resume.location.split(' · ')[0]}</dd>
          </div>
          <div>
            <dt>Works with</dt>
            <dd>{stack.join(', ')}</dd>
          </div>
        </dl>
        <div className="actions">
          <Link className="btn solid" to="/projects">
            See the work
          </Link>
          <Link className="btn" to="/resume">
            Résumé
          </Link>
        </div>
      </Row>

      <Row rail="Client work">
        <ProjectIndex items={inGroup('work')} />
      </Row>

      <Row rail="My own products">
        <ProjectIndex items={inGroup('product')} />
        <div className="pair">
          {[9, 11].map((id) => (
            <Link
              key={id}
              to={`/project/${id}`}
              aria-label={projects.find((p) => p.id === id).title}
            >
              <Shot image={projectImages[id][0]} />
            </Link>
          ))}
        </div>
      </Row>

      <Row rail="AI in my work">
        <ul className="plain measure ai-work">
          {aiWork.map((a) => (
            <li key={a.title}>
              {a.id ? (
                <Link to={`/project/${a.id}`}>{a.title}</Link>
              ) : a.href ? (
                <a href={a.href} target="_blank" rel="noreferrer">
                  {a.title}
                </a>
              ) : (
                <Link to={a.to}>{a.title}</Link>
              )}
              <span className="muted"> · {a.line}</span>
            </li>
          ))}
        </ul>
      </Row>

      <Row rail="About">
        <div className="measure">
          <p>{site.background}</p>
          <p>{site.flutter}</p>
        </div>
      </Row>

      <Row rail="Skills">
        <Skills />
      </Row>

      <Row rail="Experience">
        <div className="jobs">
          {resume.experience.map((j) => (
            <div className="job" key={j.company}>
              <div className="job-head">
                <h3>
                  {j.title}, {j.company}
                </h3>
                <span className="when">{j.period}</span>
              </div>
              <div className="ctx">{j.context}</div>
              {j.sections.some((s) => s.heading) && (
                <ul className="plain" style={{ marginTop: '0.7rem' }}>
                  {j.sections.map((s) => (
                    <li key={s.heading}>{s.heading}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '2rem' }}>
          <Link to="/resume">Read the full résumé</Link>
        </p>
      </Row>

      <Row rail="Also">
        <ul className="plain measure">
          {openSource.map((o) => (
            <li key={o.href}>
              <a href={o.href} target="_blank" rel="noreferrer">
                {o.title}
              </a>
              <span className="muted"> · {o.line}</span>
            </li>
          ))}
          <li>
            <Link to="/projects">Earlier projects</Link>
            <span className="muted">
              {' '}
              ·{' '}
              {inGroup('earlier')
                .map((p) => p.title)
                .join(', ')}
            </span>
          </li>
          <li>
            <Link to="/blog">Writing</Link>
            <span className="muted">
              {' '}
              · Notes on production problems and how we fixed them
            </span>
          </li>
        </ul>
      </Row>
    </>
  );
}
