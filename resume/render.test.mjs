import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resume } from './content.mjs';
import { renderResume, VARIANTS, FORBIDDEN } from './render.mjs';

const HEADLINE = 'Senior Full-Stack Engineer · PHP/Laravel · TypeScript (Next.js, Fastify) · Python (FastAPI)';
const LOCATION = 'Dhaka, Bangladesh · Open to relocation';
const GULF = 'Nationality: Bangladeshi · Open to relocation · Requires visa sponsorship · Notice period: 3 months';
const REFS = 'References available on request';
const esc = (s) => s.replaceAll('&', '&amp;');
const visible = (html) => html.replace(/<[^>]+>/g, '');

test('default europe has no photo or nationality', () => {
  const html = renderResume(resume, 'europe', { photoSrc: 'p.png' });
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('Nationality'));
});

test('europe-photo has photo, no nationality', () => {
  const html = renderResume(resume, 'europe-photo', { photoSrc: 'p.png' });
  assert.ok(html.includes('<img') && html.includes('p.png'));
  assert.ok(!html.includes('Nationality'));
});

test('gulf has photo and exact details strip', () => {
  const html = renderResume(resume, 'gulf', { photoSrc: 'p.png' });
  assert.ok(html.includes('<img'));
  assert.ok(visible(html).includes(GULF));
});

test('every variant has headline, location, references line', () => {
  assert.deepEqual(VARIANTS, ['europe', 'europe-photo', 'gulf']);
  for (const v of VARIANTS) {
    const html = renderResume(resume, v, { photoSrc: 'p.png' });
    for (const s of [HEADLINE, LOCATION, REFS]) assert.ok(html.includes(esc(s)), `${v} missing ${s}`);
  }
});

test('escapes HTML', () => {
  const html = renderResume({ ...resume, headline: 'A & <B>' }, 'europe', {});
  assert.ok(html.includes('A &amp; &lt;B&gt;'));
});

test('no forbidden claims or AI-sounding filler', () => {
  const text = JSON.stringify(resume);
  for (const re of FORBIDDEN) assert.ok(!re.test(text), `forbidden: ${re}`);
});

test('AI tools mentioned only in summary and the AI Coach entry', () => {
  const { summary, experience, products } = resume;
  assert.ok(summary.join(' ').includes('Claude Code'));
  const rest = JSON.stringify({ products, other: experience.slice(1) });
  assert.ok(!/AI-assisted|Claude Code/.test(rest));
  const cefalo = experience[0].sections.filter((s) => !s.heading.includes('AI Coach'));
  assert.ok(!/AI-assisted|Claude Code/.test(JSON.stringify(cefalo)));
});

test('experience order and employer', () => {
  assert.equal(resume.experience[0].company, 'Cefalo');
  assert.equal(resume.experience[0].title, 'Senior Software Engineer');
  assert.match(resume.experience[1].company, /Grameenphone/);
  assert.equal(resume.experience[2].company, 'Brain Station 23');
});

test('at most 3 bullets per section, one sentence each', () => {
  for (const job of resume.experience)
    for (const s of job.sections) {
      assert.ok(s.bullets.length <= 3, `${s.heading} has ${s.bullets.length}`);
      for (const b of s.bullets) assert.ok(!b.includes(';'), `semicolon in: ${b}`);
    }
});

test('not positioned as a mobile developer, AI kept low-key', () => {
  const top = JSON.stringify([resume.headline, resume.summary, resume.site]);
  assert.doesNotMatch(top, /mobile|enthusiast/i);
  assert.doesNotMatch(top, /every day/i);
  assert.equal((top.match(/Claude Code/g) || []).length, 1);
});

test('summary names AI features built for production', () => {
  assert.match(resume.summary.join(' '), /AI features that run in production/);
});
