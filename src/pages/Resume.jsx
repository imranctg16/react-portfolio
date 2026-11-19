import { Link } from 'react-router-dom';
import { resume } from '../../resume/content.mjs';
import { projects } from '../data/projects.mjs';
import { Row, Ext, useTitle } from '../components/ui';
import { Skills } from './Home';

const PDF = '/Mohammad_Imran_Hossain_Resume.pdf';
const pageFor = (name) => projects.find((p) => p.title === name);
// content.mjs points Sellora at this site, which is no use as a link from this site.
const isOwnSite = (link) => link.includes(resume.contact.portfolio);

export default function Resume() {
  useTitle('Résumé');
  const r = resume;
  return (
    <>
      <Row rail="Résumé" className="title-block">
        <h1>{r.name}</h1>
        <p className="lead">{r.headline}</p>
        <p className="muted">{r.location}</p>
        <p>
          <a href={`mailto:${r.contact.email}`}>{r.contact.email}</a>
          <span className="muted"> · </span>
          <Ext href={r.contact.linkedin}>LinkedIn</Ext>
        </p>
        <div className="actions">
          <a className="btn solid" href={PDF} download>
            Download the PDF
          </a>
          <a className="btn" href={PDF} target="_blank" rel="noreferrer">
            Open the PDF
          </a>
        </div>
      </Row>

      <Row rail="Summary">
        <div className="measure">
          {r.summary.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </Row>

      <Row rail="Skills">
        <Skills />
      </Row>

      <Row rail="Experience">
        <div className="jobs">
          {r.experience.map((j) => (
            <div className="job" key={j.company}>
              <div className="job-head">
                <h2>
                  {j.title}, {j.company}
                </h2>
                <span className="when">{j.period}</span>
              </div>
              <div className="ctx">{j.context}</div>
              {j.sections.map((s) => (
                <div className="sec measure" key={s.heading + s.note}>
                  {s.heading && <h4>{s.heading}</h4>}
                  {(s.note || s.link) && (
                    <div className="note">
                      {s.note}
                      {s.note && s.link && ' · '}
                      {s.link && <Ext href={s.link}>{s.link}</Ext>}
                    </div>
                  )}
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Row>

      <Row rail="Products I built">
        <div className="jobs">
          {r.products.map((p) => (
            <div className="job" key={p.name}>
              <div className="job-head">
                <h2>{pageFor(p.name) ? <Link to={`/project/${pageFor(p.name).id}`}>{p.name}</Link> : p.name}</h2>
                <span className="when">{p.status}</span>
              </div>
              <div className="sec measure" style={{ marginTop: '0.2rem' }}>
                <div className="note">
                  {p.role} · {p.stack}
                  {!isOwnSite(p.link) && (
                    <>
                      {' · '}
                      <Ext href={p.link}>{p.link.split('/')[0]}</Ext>
                    </>
                  )}
                </div>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Row>

      <Row rail="Education">
        <h3>{r.education.degree}</h3>
        <p className="muted">
          {r.education.school} · {r.education.period} · {r.education.detail}
        </p>
      </Row>

      <Row rail="Certificates">
        <ul className="plain">
          {r.certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Row>

      <Row rail="Also">
        <ul className="plain">
          {r.achievements.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Row>

      <Row rail="Languages">
        <p>{r.languages}</p>
      </Row>
    </>
  );
}
