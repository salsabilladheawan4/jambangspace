const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Products.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    '<tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">\n                                <tr>',
    '<tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">'
);

fs.writeFileSync(file, content);
