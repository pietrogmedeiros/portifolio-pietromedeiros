import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, ArrowUpRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from './translations';

gsap.registerPlugin(ScrollTrigger);

function TrajectoryAnimation() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start py-12 opacity-40">
      <svg width="40" height="240" viewBox="0 0 40 240" fill="none" className="overflow-visible">
        <motion.path
          d="M20 0 V240"
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <motion.circle
          cx="20"
          cy="0"
          r="2"
          fill="white"
          animate={{ 
            cy: [0, 240],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />

        {[60, 120, 180].map((y, i) => (
          <g key={i}>
            <motion.circle
              cx="20"
              cy={y}
              r="4"
              fill="#050505"
              stroke="white"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.5 }}
            />
            <motion.circle
              cx="20"
              cy={y}
              r="12"
              stroke="white"
              strokeWidth="0.2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, delay: i * 1, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('PT');
  const t = translations[lang];
  
  const heroRef = useRef<HTMLDivElement>(null);
  const photoOverRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image reveal animation
      gsap.to(photoOverRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      // Title fade out/scale on scroll
      gsap.to(titleRef.current, {
        opacity: 0,
        scale: 1.1,
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% center',
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <div className="relative font-sans text-white bg-[#050505] selection:bg-white selection:text-black min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-transparent pointer-events-none">
        <div className="flex flex-col pointer-events-auto text-left">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-semibold leading-none mb-2">
            {lang === 'PT' ? 'Arquiteto de Software' : lang === 'ES' ? 'Arquitecto de Software' : 'Software Architect'}
          </span>
          <h1 className="font-sans font-extrabold text-xl md:text-2xl tracking-tighter leading-none">PIETRO MEDEIROS</h1>
        </div>
        
        <nav className="flex gap-6 items-center pointer-events-auto">
          <div className="flex gap-4 text-[10px] font-bold tracking-widest text-gray-500">
            {(['PT', 'EN', 'ES'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`transition-all duration-300 relative py-1 ${
                  lang === l ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white' : 'hover:text-white/70'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center pl-6 border-l border-white/10">
            <a href="https://github.com/pietrogmedeiros" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/pietro-medeiros-770bba162/" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-container relative">
        <div className="hero-sticky">
          <img 
            src="https://pub-81a45561620841fda795ae2c78ee5927.r2.dev/frente-oculos.png" 
            alt="Pietro Medeiros" 
            className="photo-under opacity-40"
          />
          <img 
            ref={photoOverRef}
            src="https://pub-81a45561620841fda795ae2c78ee5927.r2.dev/90%C2%BA-oculos-polo.png" 
            alt="Pietro Medeiros" 
            className="photo-over grayscale brightness-75"
          />
          
          <div ref={titleRef} className="z-10 text-center px-4 max-w-4xl">
            <motion.h2 
              key={`${lang}-title`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-serif italic font-light tracking-tight leading-[0.85] text-gray-100"
            >
              {t.hero.title}
            </motion.h2>
            <motion.p 
              key={`${lang}-subtitle`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="mt-6 text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-white"
            >
              {t.hero.subtitle}
            </motion.p>
          </div>
          
          <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 z-30">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white whitespace-nowrap">{t.hero.scroll}</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="relative z-20 px-8 pb-24 max-w-7xl mx-auto -mt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-min gap-4">
          
          {/* Story Section - Moved to Top */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="md:col-span-12 glass-card bg-white/[0.02]"
          >
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4 flex flex-col items-start gap-8">
                 <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">{t.about.storyTitle}</span>
                 <TrajectoryAnimation />
              </div>
              <div className="md:col-span-8">
                <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 whitespace-pre-wrap">
                  {t.about.storyText}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a 
                    href="https://wa.me/5551986832184" 
                    target="_blank" 
                    className="text-[10px] uppercase tracking-widest px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all rounded-full flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform"></div>
                    {t.contact.whatsapp}
                  </a>
                  <a 
                    href="mailto:pietrogmedeiros01@gmail.com" 
                    className="text-[10px] uppercase tracking-widest px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all rounded-full flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/80 transition-transform"></div>
                    {t.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Box */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="md:col-span-7 glass-card flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">{t.about.title}</span>
              <span className="text-[10px] font-mono text-gray-600 tracking-tighter">{t.about.label}</span>
            </div>
            <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-200 font-serif italic">
              “{t.about.description}”
            </p>
          </motion.div>

          {/* Experience Detail */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 glass-card"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-8 block">{t.experience.labelTimeline}</span>
            <div className="space-y-8">
              <div className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">Lead Software Architect</h4>
                  <span className="text-[9px] font-mono text-gray-600">2023 — Present</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Arquitetura sistêmica e governança técnica de alto nível.
                </p>
              </div>
              <div className="group opacity-70">
                <div className="flex justify-between items-baseline mb-1 font-serif">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">Systems Engineer</h4>
                  <span className="text-[9px] font-mono text-gray-600">2021 — 2023</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  Otimização de performance e resiliência em infraestruturas distribuídas.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {['AWS Certified', 'Kubernetes Expert', 'Go Developer'].map(tag => (
                <span key={tag} className="text-[9px] px-2 py-0.5 border border-white/5 bg-white/5 rounded text-gray-400 font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Featured Project 1: Lemon.meet */}
          <motion.a 
            href="https://espremaseulimao.web.app/"
            target="_blank"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 glass-card group relative overflow-hidden flex flex-col justify-between border-white/10 hover:border-white/30 transition-all min-h-[320px]"
          >
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-60 transition-all duration-700 bg-black/40">
               <img 
                 src="https://pub-81a45561620841fda795ae2c78ee5927.r2.dev/Captura%20de%20Tela%202026-04-28%20a%CC%80s%2019.30.24.png" 
                 alt="Lemon.meet Preview 1" 
                 className="absolute inset-0 w-full h-full object-contain object-top grayscale brightness-50"
               />
               <img 
                 src="https://pub-81a45561620841fda795ae2c78ee5927.r2.dev/Captura%20de%20Tela%202026-04-28%20a%CC%80s%2019.30.58.png" 
                 alt="Lemon.meet Preview 2" 
                 className="absolute inset-0 w-full h-full object-contain object-top transition-all duration-700 [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
               />
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold group-hover:text-white transition-colors">{t.projects.labelProject}</span>
              <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="relative z-10 mt-auto">
              <h4 className="text-2xl font-serif font-bold italic text-white leading-tight">{t.projects.limao.name}</h4>
              <p className="text-xs text-gray-400 group-hover:text-white mt-2 leading-relaxed transition-colors drop-shadow-md">
                {t.projects.limao.desc}
              </p>
            </div>
          </motion.a>

          {/* Featured Project 2: Nex-ID */}
          <motion.a 
            href="https://nex-id.com/"
            target="_blank"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 glass-card group relative overflow-hidden flex flex-col justify-between border-white/10 hover:border-white/30 transition-all min-h-[320px]"
          >
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-60 transition-all duration-700 bg-black/40">
               <img 
                 src="https://pub-81a45561620841fda795ae2c78ee5927.r2.dev/Captura%20de%20Tela%202026-04-28%20a%CC%80s%2019.27.43.png" 
                 alt="Nex-ID Preview 1" 
                 className="absolute inset-0 w-full h-full object-contain object-top grayscale brightness-50"
               />
               <img 
                 src="https://pub-81a45561620841fda795ae2c78ee5927.r2.dev/Captura%20de%20Tela%202026-04-28%20a%CC%80s%2019.28.14.png" 
                 alt="Nex-ID Preview 2" 
                 className="absolute inset-0 w-full h-full object-contain object-top transition-all duration-700 [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
               />
            </div>
            <div className="relative z-10 flex justify-between items-start">
               <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold group-hover:text-white transition-colors">{t.projects.labelIdentity}</span>
               <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="relative z-10 mt-auto">
               <h4 className="text-2xl font-serif font-bold italic text-white leading-tight">{t.projects.nexid.name}</h4>
               <p className="text-xs text-gray-400 group-hover:text-white mt-2 leading-relaxed transition-colors drop-shadow-md">
                 {t.projects.nexid.desc}
               </p>
            </div>
          </motion.a>

          {/* Discovery & Projects */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="md:col-span-4 glass-card"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-8 block">{t.projects.others}</span>
            <div className="space-y-4">
              {[
                { name: 'Poupen', url: 'https://github.com/pietrogmedeiros/poupen' },
                { name: 'Analyzer Price', url: 'https://github.com/pietrogmedeiros/Analyzer-price-mktplaces' },
                { name: 'WebAds Analytics', url: 'https://github.com/pietrogmedeiros/webads_analytics' }
              ].map(p => (
                <a key={p.name} href={p.url} target="_blank" className="flex justify-between items-center group">
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">{p.name}</span>
                  <div className="w-8 h-px bg-white/5 group-hover:w-12 group-hover:bg-white/40 transition-all"></div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* New Connect Card - Full Width at Bottom */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="md:col-span-12 glass-card flex flex-col md:flex-row justify-between items-center gap-8 border-white/5"
          >
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-2">{t.contact.title}</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <a href="https://github.com/pietrogmedeiros" target="_blank" className="flex items-center gap-3 group">
                <Github size={18} className="text-gray-600 group-hover:text-white transition-all group-hover:scale-110" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">GITHUB</span>
              </a>
              <a href="https://www.linkedin.com/in/pietro-medeiros-770bba162/" target="_blank" className="flex items-center gap-3 group">
                <Linkedin size={18} className="text-gray-600 group-hover:text-white transition-all group-hover:scale-110" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">LINKEDIN</span>
              </a>
            </div>

            <div className="pt-8 md:pt-0 md:pl-12 md:border-l border-white/5">
              <span className="text-[9px] text-gray-800 uppercase tracking-widest font-mono">© 2026 / INOVANDO</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

