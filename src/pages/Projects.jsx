import { projects, openSource, GROUPS } from '../data/projects.mjs';
import { Row, ProjectIndex, useTitle } from '../components/ui';

export default function Projects() {
  useTitle('Work');
  return (
    <>
      <Row rail="Work" className="title-block">
        <h1>Work</h1>
        <p className="lead measure">
          Client work first, then the products I build in my own time. Each one opens a short page about what it is and what I did.
        </p>
      </Row>
      {GROUPS.map((g) => (
        <Row key={g.key} rail={g.label}>
          <ProjectIndex items={projects.filter((p) => p.group === g.key)} />
        </Row>
      ))}
      <Row rail="Open source">
        <ul className="index">
          {openSource.map((o) => (
            <li key={o.href}>
              <a className="item" href={o.href} target="_blank" rel="noreferrer">
                <span className="n" aria-hidden="true">↗</span>
                <span>
                  <span className="t">{o.title}</span>
                  <span className="l" style={{ display: 'block' }}>{o.line}</span>
                </span>
                <span className="m">
                  <b>{o.meta}</b>GitHub
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Row>
    </>
  );
}
