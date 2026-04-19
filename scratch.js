const fs = require('fs');
function countKeys(obj, lang) { return Object.keys(obj[lang] || {}).length; }
const content = fs.readFileSync('js/translations.js', 'utf8');
const objMatch = content.match(/const translations = (\{[\s\S]*?\});/);
if (objMatch) {
  const translations = eval('(' + objMatch[1] + ')');
  const enKeys = Object.keys(translations.en);
  ['en', 'th', 'zh', 'ja', 'ko', 'lo'].forEach(lang => {
    const keys = Object.keys(translations[lang] || {});
    console.log(lang + " count: " + keys.length);
    const missing = enKeys.filter(k => !keys.includes(k));
    if (missing.length) console.log(lang + " missing: " + missing.join(', '));
  });
}
