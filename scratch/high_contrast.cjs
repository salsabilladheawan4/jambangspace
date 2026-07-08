const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/LandingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Change section bg to dark brown
content = content.replace('className="py-24 bg-white relative overflow-hidden"', 'className="py-24 bg-[#3d2817] relative overflow-hidden"');

// Change heading text to white
content = content.replace('className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4"', 'className="text-4xl md:text-5xl font-bold text-white mb-4"');

// Change description text to light gray/beige
content = content.replace('className="text-[#6b5344] max-w-2xl mx-auto text-lg"\n            >\n              Kami memberikan pengalaman ngopi terbaik', 'className="text-[#d4cfc4] max-w-2xl mx-auto text-lg"\n            >\n              Kami memberikan pengalaman ngopi terbaik');

// Optionally, cards can be pure white again if they were #faf6f1, let's leave them #faf6f1 or make them pure white.
content = content.replace('className="bg-[#faf6f1] p-8 rounded-[2.5rem]', 'className="bg-white p-8 rounded-[2.5rem]');
// Change icon wrapper back to #faf6f1 for contrast against pure white card
content = content.replace('className="w-20 h-20 mx-auto rounded-full bg-white group-hover:bg-[#c97b4b]', 'className="w-20 h-20 mx-auto rounded-full bg-[#faf6f1] group-hover:bg-[#c97b4b]');

fs.writeFileSync(file, content);
console.log('Done tweaking contrast');
