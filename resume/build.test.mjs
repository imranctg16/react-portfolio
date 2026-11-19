import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { buildAll } from './build.mjs';

const text = (pdf) => execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8' });

test('builds three PDFs of at most two pages with the right content', async () => {
  const results = await buildAll();
  assert.deepEqual(results.map((r) => r.variant), ['europe', 'europe-photo', 'gulf']);
  for (const r of results) assert.ok(r.pages >= 1 && r.pages <= 2, `${r.variant}: ${r.pages} pages`);
  const eu = text(results[0].pdfPath);
  assert.match(eu, /Aviyond/);
  assert.match(eu, /Senior Software Engineer/);
  assert.match(eu, /Zymfonix · Aviyond/);
  assert.doesNotMatch(eu, /Nationality/);
  assert.match(text(results[2].pdfPath), /Notice period: 3 months/);
});
