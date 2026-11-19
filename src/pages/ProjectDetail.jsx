import { Link, Navigate, useParams } from 'react-router-dom';
import { projects, getProjectById, GROUPS, RETIRED_IDS } from '../data/projects.mjs';
import { projectImages } from '../data/projectImages';
import { Row, Shot, Ext, useTitle } from '../components/ui';
import { NotFound } from '../App';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);
  useTitle(project ? project.title : 'Page not found');

  if (RETIRED_IDS.includes(Number(id))) return <Navigate to="/projects" replace />;
  if (!project) return <NotFound />;

  const images = projectImages[project.id] ?? [];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const group = GROUPS.find((g) => g.key === project.group).label;
  const facts = [
    ['Role', project.role],
    ['For', project.org],
    ['When', project.period],
    ['Status', project.status],
    ['Built with', project.stack.join(', ')],
  ].filter(([, v]) => v);

  return (
    <article>
      <Row rail={<Link to="/projects">← All work</Link>} className="title-block">
        <p className="eyebrow">{group}</p>
        <h1>{project.title}</h1>
        <p className="lead measure">{project.line}</p>
      </Row>

      <Row
        rail={
          <dl className="meta">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            {project.links.length > 0 && (
              <div>
                <dt>Links</dt>
                <dd>
                  {project.links.map((l) => (
                    <Ext key={l.href} href={l.href}>
                      {l.label} ↗
                    </Ext>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        }
      >
        {images.map((image, i) => (
          <Shot key={image.src} image={image} eager={i === 0} />
        ))}
        <div className="prose">
          {project.body.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p?.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {s.link && (
                <p>
                  <Link to={s.link.to}>{s.link.label}</Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </Row>

      <Row rail="Next">
        <Link className="item" to={`/project/${next.id}`} style={{ padding: 0, gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <span>
            <span className="t">
              {next.title}
              <i aria-hidden="true">→</i>
            </span>
            <span className="l" style={{ display: 'block' }}>{next.line}</span>
          </span>
        </Link>
      </Row>
    </article>
  );
}
