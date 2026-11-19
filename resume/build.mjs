import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resume } from './content.mjs';
import { renderResume, VARIANTS } from './render.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CV_DIR = resolve(ROOT, '..');
const PHOTO_SRC = '/home/imran/Downloads/Muhammad Imran.png';
const HEADSHOT = join(ROOT, 'public', 'headshot.png');
const OUT_NAMES = {
  europe: 'Mohammad Imran Hossain - CV (Europe).pdf',
  'europe-photo': 'Mohammad Imran Hossain - CV (Europe, photo).pdf',
  gulf: 'Mohammad Imran Hossain - CV (Gulf).pdf',
};

const tmp = mkdtempSync(join(tmpdir(), 'cv-build-'));
// Separate profile: Chrome refuses to share the user's running profile.
const chrome = (...args) =>
  execFileSync('google-chrome', ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${join(tmp, 'profile')}`, ...args], { stdio: 'pipe' });

export function pageCount(pdfPath) {
  const out = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' });
  return Number(out.match(/^Pages:\s+(\d+)/m)[1]);
}

function ensureHeadshot() {
  if (existsSync(HEADSHOT)) return;
  const html = join(tmp, 'crop.html');
  writeFileSync(html, `<style>html,body{margin:0}img{width:600px;height:600px;object-fit:cover;object-position:50% 22%;display:block}</style><img src="${pathToFileURL(PHOTO_SRC)}">`);
  chrome('--hide-scrollbars', '--window-size=600,600', `--screenshot=${HEADSHOT}`, pathToFileURL(html).href);
}

export async function buildAll() {
  ensureHeadshot();
  const results = [];
  for (const variant of VARIANTS) {
    const html = join(tmp, `${variant}.html`);
    writeFileSync(html, renderResume(resume, variant, { photoSrc: pathToFileURL(HEADSHOT).href }));
    const pdfPath = join(CV_DIR, OUT_NAMES[variant]);
    chrome('--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, pathToFileURL(html).href);
    const pages = pageCount(pdfPath);
    if (pages > 2) throw new Error(`${variant} CV is ${pages} pages; trim content.mjs to fit two`);
    results.push({ variant, pdfPath, pages });
  }
  copyFileSync(results[0].pdfPath, join(ROOT, 'public', 'Mohammad_Imran_Hossain_Resume.pdf'));
  return results;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const r of await buildAll()) console.log(`${r.variant}: ${r.pages} page(s) → ${r.pdfPath}`);
}
