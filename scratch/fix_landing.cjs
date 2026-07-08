const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/LandingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The file is currently mangled around line 107.
// It has:
//         <motion.div 
//       <section id="teams" className="py-24 bg-[#faf6f1]">

// We will replace that exact string with the correct content.
const brokenPart = `        <motion.div \r
      <section id="teams" className="py-24 bg-[#faf6f1]">`;
const brokenPart2 = `        <motion.div \n      <section id="teams" className="py-24 bg-[#faf6f1]">`;

const correctPart = `        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative overflow-hidden h-[400px] md:h-auto"
        >
          <img src={heroKopi} alt="Biji Kopi Jambang" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. FEATURES BAR */}
      <section id="features" className="py-24 bg-[#faf6f1] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4"
            >
              Kenapa Jambang Space?
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
              className="text-[#6b5344] max-w-2xl mx-auto text-lg"
            >
              Kami memberikan pengalaman ngopi terbaik dengan memadukan biji kopi pilihan, keahlian barista, dan suasana yang tak terlupakan.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(201,123,75,0.15)] transition-all duration-300 text-center group border border-[#f0eade]"
              >
                <motion.div 
                  className="w-20 h-20 mx-auto rounded-full bg-[#faf6f1] group-hover:bg-[#c97b4b] flex items-center justify-center text-4xl mb-6 transition-colors duration-500 shadow-inner"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</span>
                </motion.div>
                <h4 className="font-bold text-xl mb-3 text-[#3d2817] group-hover:text-[#c97b4b] transition-colors duration-300">{f.title}</h4>
                <p className="text-sm text-[#6b5344] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. TIM HEBAT & KEUNGGULAN SISTEM */}
      <section id="teams" className="py-24 bg-[#faf6f1]">`;

let replaced = false;
if (content.includes(brokenPart)) {
    content = content.replace(brokenPart, correctPart);
    replaced = true;
} else if (content.includes(brokenPart2)) {
    content = content.replace(brokenPart2, correctPart);
    replaced = true;
}

if (!replaced) {
    // try a regex if line endings are weird
    const regex = /        <motion\.div\s*<section id="teams" className="py-24 bg-\[#faf6f1\]">/;
    content = content.replace(regex, correctPart);
}

fs.writeFileSync(file, content);
console.log('Fixed LandingPage.jsx');
