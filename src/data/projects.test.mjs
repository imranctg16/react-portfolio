import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, openSource, aiWork, getProjectById } from './projects.mjs';
import { FORBIDDEN } from '../../resume/render.mjs';

test('public project URLs stay stable', () => {
  assert.deepEqual(projects.map((p) => p.id).sort((a, b) => a - b), [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13]);
  assert.equal(getProjectById('10').title, 'Sellora');
  assert.equal(getProjectById('4').title, 'Dynamic Workflow Engine');
  assert.equal(getProjectById('2').title, 'AWS Exam Prep');
  assert.equal(getProjectById('5'), undefined);
  assert.equal(getProjectById('abc'), undefined);
});

test('project copy has no forbidden claims or filler', () => {
  const text = JSON.stringify({ projects, openSource, aiWork });
  for (const re of [...FORBIDDEN, /I led\b/i, /test coverage/i, /commits/i]) assert.ok(!re.test(text), `forbidden: ${re}`);
});

test('Sellora links to the live beta, and AI tools are not named on products', () => {
  assert.deepEqual(getProjectById(10).links.map((l) => l.href), ['https://campaignflow-1wn.pages.dev']);
  assert.ok(!/Claude/.test(JSON.stringify(projects)));
});

test('AI in my work: features first, then coaching and the plugin, all linked', () => {
  assert.deepEqual(aiWork.filter((a) => a.id).map((a) => a.id), [7, 11, 10]);
  for (const a of aiWork) assert.ok(a.id ? getProjectById(a.id) : a.href || a.to, a.title);
  assert.ok(!/gender/i.test(JSON.stringify({ projects, aiWork })));
});

test('Kinderfable page describes the AI pipeline', () => {
  const k = JSON.stringify(getProjectById(11));
  assert.match(k, /ElevenLabs/);
  assert.match(k, /own voice/);
});
