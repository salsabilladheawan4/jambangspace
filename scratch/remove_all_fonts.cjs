const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('d:/react-kel11/jambang-app/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/ style=\{\{\s*fontFamily:\s*['"]Georgia['"]?,\s*serif['"]?\s*\}\}/g, '');
  content = content.replace(/ style=\{\{\s*fontFamily:\s*['"]'Georgia',\s*serif['"]\s*\}\}/g, '');
  content = content.replace(/ style=\{\{\s*fontFamily:\s*['"]Georgia,\s*serif['"]\s*\}\}/g, '');
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
console.log('Finished');
