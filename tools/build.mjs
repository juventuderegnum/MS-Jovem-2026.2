/**
 * BUILD PIPELINE — Missões Regnum (Vercel + esbuild)
 * ---------------------------------------------------
 * Minifica styles.css, script.js e clarity.js para dist/ MANTENDO OS MESMOS
 * NOMES DE ARQUIVO referenciados pelo index.html (zero mudanças de referência),
 * copia o index.html e a pasta assets/.
 *
 * Na Vercel: "buildCommand": "npm run build" + "outputDirectory": "dist" (vercel.json).
 * Localmente: npm install && npm run build (requer Node 18+).
 */
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

// Recomeça o dist/ do zero a cada build (evita arquivos órfãos defasados)
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// 1. JS — minificado, mesmas dependências, mesmo nome de arquivo
await build({
  entryPoints: [join(root, 'script.js')],
  outfile: join(dist, 'script.js'),
  minify: true,
  target: ['es2018'],
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'info',
});

await build({
  entryPoints: [join(root, 'clarity.js')],
  outfile: join(dist, 'clarity.js'),
  minify: true,
  target: ['es2018'],
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'info',
});

// 2. CSS — minificado preservando a ordem da cascata (crítico para o design)
await build({
  entryPoints: [join(root, 'styles.css')],
  outfile: join(dist, 'styles.css'),
  minify: true,
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'info',
});

// 3. Estáticos — HTML e imagens vão intactos (assets já são WebP otimizados)
cpSync(join(root, 'index.html'), join(dist, 'index.html'));
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });

console.log('✓ Build concluído → dist/ (index.html + assets/ + styles.css + script.js + clarity.js)');
