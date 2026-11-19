export const VARIANTS = ['europe', 'europe-photo', 'gulf'];

// Claims the inventory rules out, plus filler that made the first draft sound generated.
export const FORBIDDEN = [
  /Overture/i, /MatchAI scoring/i, /12 teams/i, /prompt caching/i, /Capacitor/i, /time zone/i,
  /paying users/i, /solution architect/i,
  /end to end/i, /end-to-end/i, /leverag/i, /spearhead/i, /cutting-edge/i, /\bshipped\b/i, /×/, /~/,
  /%/, /Lighthouse/i, /passionate/i,
];

const esc = (s = '') =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const CSS = `
@page { size: A4; margin: 13mm 15mm; }
* { box-sizing: border-box; }
body { margin: 0; font: 9.6pt/1.42 "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: #141b24; }
header { display: flex; gap: 6mm; align-items: flex-start; }
header .id { flex: 1; }
h1 { font-size: 20pt; margin: 0; letter-spacing: -.01em; }
.headline { color: #1f5c99; font-weight: 600; margin-top: 1mm; }
.meta { color: #4b5563; margin-top: 1.2mm; font-size: 9pt; }
.gulf { margin-top: 1.2mm; font-size: 9pt; font-weight: 600; }
.photo { width: 28mm; height: 28mm; object-fit: cover; object-position: 50% 22%; border-radius: 2mm; }
h2 { font-size: 8.6pt; letter-spacing: .1em; text-transform: uppercase; color: #1f5c99; margin: 4.2mm 0 1.6mm; padding-bottom: .8mm; border-bottom: .3mm solid #d3dae3; }
p { margin: 0 0 1.2mm; }
.row { display: flex; justify-content: space-between; gap: 4mm; font-weight: 600; break-after: avoid; }
.row span { font-weight: 400; color: #4b5563; white-space: nowrap; }
.ctx { color: #4b5563; font-size: 9pt; }
.job { margin-bottom: 2.6mm; break-inside: avoid; }
.meta i, .gulf i { font-style: normal; white-space: nowrap; }
.sec { margin-top: 1.8mm; break-inside: avoid; }
.sec h3 { font-size: 9.6pt; margin: 0; }
ul { margin: .8mm 0 0; padding-left: 4.5mm; }
li { margin-bottom: .6mm; }
.skills { display: grid; grid-template-columns: 32mm 1fr; gap: .6mm 3mm; }
.skills b { font-weight: 600; }
.prod { margin-bottom: 2mm; break-inside: avoid; }
.refs { margin-top: 4mm; color: #4b5563; font-style: italic; }
`;

function section({ heading, note, link, bullets }) {
  return `<div class="sec">
${heading ? `<h3>${esc(heading)}</h3>` : ''}
${note || link ? `<div class="ctx">${esc([note, link].filter(Boolean).join(' · '))}</div>` : ''}
<ul>${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
</div>`;
}

export function renderResume(r, variant, { photoSrc } = {}) {
  const photo = variant !== 'europe' && photoSrc;
  const c = r.contact;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(r.name)} — CV</title><style>${CSS}</style></head><body>
<header>
  <div class="id">
    <h1>${esc(r.name)}</h1>
    <div class="headline">${esc(r.headline)}</div>
    <div class="meta">${esc(r.location)}</div>
    <div class="meta">${[c.email, c.phone, c.linkedin, c.portfolio].map((x) => `<i>${esc(x)}</i>`).join(' · ')}</div>
    ${variant === 'gulf' ? `<div class="gulf">${r.gulfDetails.split(' · ').map((x) => `<i>${esc(x)}</i>`).join(' · ')}</div>` : ''}
  </div>
  ${photo ? `<img class="photo" src="${esc(photoSrc)}" alt="${esc(r.name)}">` : ''}
</header>

<h2>Summary</h2>
${r.summary.map((p) => `<p>${esc(p)}</p>`).join('')}

<h2>Experience</h2>
${r.experience
  .map(
    (j) => `<div class="job">
<div class="row">${esc(j.company)} — ${esc(j.title)} <span>${esc(j.period)}</span></div>
<div class="ctx">${esc(j.context)}</div>
${j.sections.map(section).join('')}
</div>`,
  )
  .join('')}

<h2>Own products</h2>
${r.products
  .map(
    (p) => `<div class="prod">
<div class="row">${esc(p.name)} — ${esc(p.role)} <span>${esc(p.status)}</span></div>
<div class="ctx">${esc(p.stack)} · ${esc(p.link)}</div>
<ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
</div>`,
  )
  .join('')}

<h2>Skills</h2>
<div class="skills">${r.skills.map((s) => `<b>${esc(s.label)}</b><span>${esc(s.items)}</span>`).join('')}</div>

<h2>Education</h2>
<div class="row">${esc(r.education.degree)} <span>${esc(r.education.period)}</span></div>
<div class="ctx">${esc(r.education.school)} · ${esc(r.education.detail)}</div>

<h2>Certifications and achievements</h2>
<ul>${[...r.certifications, ...r.achievements].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>

<h2>Languages</h2>
<p>${esc(r.languages)}</p>
<p class="refs">${esc(r.references)}</p>
</body></html>`;
}
