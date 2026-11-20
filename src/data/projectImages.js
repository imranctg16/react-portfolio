import aviyond from '../assets/images/aviyond/aviyond-home.webp';
import quranKeeper from '../assets/images/quran-keeper/quran-keeper-home.webp';
import kinderfable from '../assets/images/kinderfable/kinderfable-home.webp';
import sql from '../assets/images/sql/sql-dashboard.webp';
import aws from '../assets/images/aws-exam-prep/aws-dashboard.webp';
import readme from '../assets/images/readme-reader/readme-1.webp';

const img = (src, h, alt, caption) => ({ src, w: 1280, h, alt, caption });

// Keyed by project id. Client work only gets public pages, never internal screens of Uno or Signalist.
export const projectImages = {
  6: [img(aviyond, 720, 'The Aviyond home page with the job search and the number of live roles', 'aviyond.com')],
  9: [img(quranKeeper, 800, 'The Quran Keeper website showing two phone screens of the app', 'qurankeeper.com')],
  11: [img(kinderfable, 800, 'The Kinderfable home page in Bangla with an illustrated story page', 'The Kinderfable home page')],
  1: [img(sql, 568, 'SQL Playground dashboard with challenges and progress', 'The dashboard')],
  2: [img(aws, 594, 'AWS Exam Prep dashboard', 'The dashboard')],
  3: [img(readme, 597, 'README Reader with a Markdown document open', 'A document open in README Reader')],
};
