import { cpSync, existsSync } from 'node:fs';

if (!existsSync('site/index.html') || !existsSync('site/fr/services/index.html')) {
  throw new Error('The reviewed static site is missing. Rebuild and import the publication before deploying.');
}
cpSync('site', 'dist', { recursive: true });
console.log('Copied the reviewed static k11e publication to dist.');
