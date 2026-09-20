import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const birthdayHtmlPath = path.join(__dirname, '..', 'web', 'birthday', 'index.html');

export async function loadBirthdayHtml() {
    return fs.readFile(birthdayHtmlPath, 'utf8');
}
