// Dead code analysis: CSS classes not used in HTML + JS identifiers never referenced
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('styles.css', 'utf8');
const js = readFileSync('script.js', 'utf8');

// --- 1. Classes used in HTML ---
const usedClasses = new Set();
const classAttrRe = /class="([^"]*)"/g;
let m;
while ((m = classAttrRe.exec(html))) {
  m[1].trim().split(/\s+/).forEach(c => c && usedClasses.add(c));
}
// Classes added dynamically by JS (classList.add / toggle / className)
const jsClassRe = /classList\.(?:add|toggle|remove)\(['"`]([^'"`]+)['"`]\)|className\s*=\s*['"`]([^'"`]+)['"`]/g;
while ((m = jsClassRe.exec(js))) {
  const val = m[1] || m[2];
  if (val) val.split(/\s+/).forEach(c => c && usedClasses.add(c));
}

// --- 2. Classes referenced in CSS selectors ---
// Strip comments and strings first
const cssClean = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(["'])(?:\\.|(?!\1).)*\1/g, '""');
const cssClasses = new Set();
const classRe = /\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g;
while ((m = classRe.exec(cssClean))) {
  cssClasses.add(m[1]);
}

const unusedInHtml = [...cssClasses].filter(c => !usedClasses.has(c)).sort();
console.log('=== CSS CLASSES NOT PRESENT IN HTML/JS (' + unusedInHtml.length + ') ===');
unusedInHtml.forEach(c => console.log('  .' + c));

// --- 3. JS identifiers declared but never used ---
console.log('\n=== JS getElementById targets present in HTML? ===');
const idRe = /getElementById\(['"`]([^'"`]+)['"`]\)/g;
const htmlIds = new Set();
const idAttrRe = /id="([^"]*)"/g;
while ((m = idAttrRe.exec(html))) htmlIds.add(m[1]);
while ((m = idRe.exec(js))) {
  if (!htmlIds.has(m[1])) console.log('  MISSING IN HTML: #' + m[1]);
}

// --- 4. showToast call sites ---
const showToastCalls = (js.match(/showToast\s*\(/g) || []).length;
console.log('\nshowToast occurrences (1 = definition only, dead):', showToastCalls);
const btnFaqSupportUses = (js.match(/btnFaqSupport/g) || []).length;
console.log('btnFaqSupport occurrences (1 = declaration only, dead):', btnFaqSupportUses);
const toastContainerUses = (js.match(/toastContainer/g) || []).length;
console.log('toastContainer occurrences:', toastContainerUses);

// --- 5. countdown-section-standalone styled? ---
console.log('\n.countdown-section-standalone in CSS:', /\.countdown-section-standalone/.test(css));

// --- 6. Inline style attributes in HTML ---
const styleAttrRe = /style="([^"]*)"/g;
console.log('\n=== INLINE STYLE ATTRIBUTES ===');
while ((m = styleAttrRe.exec(html))) {
  const line = html.slice(0, m.index).split('\n').length;
  console.log('  line ' + line + ': ' + m[1]);
}
