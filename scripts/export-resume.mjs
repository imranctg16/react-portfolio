import { mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  // Lazy import to avoid breaking if not installed yet
  const { chromium } = await import('playwright');

  const projectRoot = resolve(__dirname, '..');
  const input = resolve(projectRoot, 'public', 'resume-one-page.html');
  const outputDir = resolve(projectRoot, 'public');
  const output = resolve(outputDir, 'Mohammad_Imran_Hossain_Resume.pdf');

  try { await access(outputDir); } catch { await mkdir(outputDir, { recursive: true }); }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Load from file URL for consistent fonts and assets
  const fileUrl = 'file://' + input;
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Ensure all fonts/images are settled
  await page.waitForLoadState('networkidle');

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log('✅ Exported PDF to:', output);
}

main().catch((err) => {
  console.error('PDF export failed:', err);
  process.exit(1);
});

