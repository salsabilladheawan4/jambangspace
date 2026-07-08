const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/LandingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the inline style
content = content.replace(/ style=\{\{ fontFamily: "'Georgia', serif" \}\}/g, '');
content = content.replace(/\n\s*style=\{\{ fontFamily: "'Georgia', serif" \}\}/g, '');

fs.writeFileSync(file, content);
console.log('Done');
