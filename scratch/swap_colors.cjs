const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/LandingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Change section background from bg-[#faf6f1] to bg-white
content = content.replace('<section id="features" className="py-24 bg-[#faf6f1] relative overflow-hidden">', 
                          '<section id="features" className="py-24 bg-white relative overflow-hidden">');

// 2. Change card background from bg-white to bg-[#faf6f1]
content = content.replace('className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(201,123,75,0.15)] transition-all duration-300 text-center group border border-[#f0eade]"',
                          'className="bg-[#faf6f1] p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(201,123,75,0.15)] transition-all duration-300 text-center group border border-transparent hover:border-[#f0eade]"');

// 3. Change icon wrapper from bg-[#faf6f1] to bg-white
content = content.replace('className="w-20 h-20 mx-auto rounded-full bg-[#faf6f1] group-hover:bg-[#c97b4b] flex items-center justify-center text-4xl mb-6 transition-colors duration-500 shadow-inner"',
                          'className="w-20 h-20 mx-auto rounded-full bg-white group-hover:bg-[#c97b4b] flex items-center justify-center text-4xl mb-6 transition-colors duration-500 shadow-sm"');

fs.writeFileSync(file, content);
console.log('Done modifying feature section colors');
