#!/usr/bin/env node

import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const portal = path.join(root, 'ui_kits', 'portal');
const appPath = path.join(portal, 'app.jsx');
const indexPath = path.join(portal, 'index.html');
const tokenPath = path.join(root, 'colors_and_type.css');
const componentPath = path.join(root, 'components.css');
const failures = [];
let checks = 0;

async function read(filePath) {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    failures.push(`${path.relative(root, filePath)} could not be read: ${error.message}`);
    return '';
  }
}

async function check(label, condition) {
  checks += 1;
  if (!condition) failures.push(label);
}

const [app, index, tokens, components] = await Promise.all([
  read(appPath),
  read(indexPath),
  read(tokenPath),
  read(componentPath),
]);

const scriptFiles = [...index.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)]
  .map((match) => match[1])
  .filter((src) => !/^(?:[a-z]+:)?\/\//i.test(src));
for (const src of scriptFiles) {
  const target = path.resolve(path.dirname(indexPath), src);
  try {
    await access(target);
    await check(`Local script exists: ${src}`, true);
  } catch {
    await check(`Missing local script: ${src}`, false);
  }
}

const screenBlock = app.match(/const SCREENS\s*=\s*\{([\s\S]*?)\n\};/);
await check('SCREENS registry is present', Boolean(screenBlock));
const screenEntries = [...(screenBlock?.[1] || '').matchAll(/(?:^|,)\s*(?:"([^"]+)"|([\w-]+))\s*:\s*([A-Za-z_$][\w$]*)/gm)]
  .map((match) => ({ route: match[1] || match[2], component: match[3] }));
await check('SCREENS registry contains 44 routes', screenEntries.length === 44);

const portalSources = await Promise.all([
  'lib.jsx', 'ui.jsx', 'shell.jsx', 'screens1.jsx', 'screens2.jsx', 'screens3.jsx',
  'screens4.jsx', 'screens5.jsx', 'mobile.jsx', 'app.jsx',
].map((file) => read(path.join(portal, file))));
const source = portalSources.join('\n');
for (const { route, component } of screenEntries) {
  await check(`Route resolves: #${route}`, new RegExp(`(?:function|const|class)\\s+${component}\\b`).test(source));
}

const directoryBlock = app.match(/const DIRECTORY\s*=\s*\[([\s\S]*?)\n\];/);
const directoryRoutes = [...(directoryBlock?.[1] || '').matchAll(/\["([^"]+)"\s*,/g)].map((match) => match[1]);
await check('Screen directory is present', Boolean(directoryBlock));
await check('Every directory route is registered', directoryRoutes.every((route) => screenEntries.some((entry) => entry.route === route)));
await check('Every registered route is in the directory', screenEntries.every((entry) => directoryRoutes.includes(entry.route)));

const tokenChecks = [
  ['Navy primary token', /--sidebar-bg:\s*#[0-9A-F]{6}/i.test(tokens)],
  ['Clinical blue accent token', /--brand-600:\s*#[0-9A-F]{6}/i.test(tokens)],
  ['Neutral border token', /--border:\s*var\(--n-200\)/.test(tokens)],
  ['Spacing scale tokens', /--space-1:\s*4px/.test(tokens) && /--space-20:\s*80px/.test(tokens)],
  ['44px hit target rule', /height:\s*44px/.test(components) && /min-height:\s*44px/.test(components)],
];
for (const [label, result] of tokenChecks) await check(label, result);

const legacyPhrases = [
  'Concept Case Study',
  'no backend, click-through prototype',
  'click-through prototype only',
];
for (const phrase of legacyPhrases) {
  await check(`Legacy phrase absent: ${phrase}`, !source.includes(phrase) && !index.includes(phrase));
}

if (failures.length > 0) {
  console.error(`MedBridge verification failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`MedBridge verification passed: ${checks} checks, 44 registered routes, local assets resolved.`);
}
