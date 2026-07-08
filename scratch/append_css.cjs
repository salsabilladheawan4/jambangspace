const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/index.css';
let content = fs.readFileSync(file, 'utf8');

const cssToAdd = `

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

if (!content.includes('.hide-scrollbar')) {
  fs.writeFileSync(file, content + cssToAdd);
}
console.log('Appended to index.css');
