/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Music, 
  Ticket, 
  Info, 
  ShieldCheck, 
  Bus, 
  Camera, 
  Users, 
  Heart,
  ChevronRight,
  Star,
  Phone,
  AlertTriangle,
  LifeBuoy,
  Map,
  Utensils,
  ShoppingBag,
  CheckCircle,
  HelpCircle,
  Leaf,
  Sparkles
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="mt-4 flex justify-center">
      <div className="h-1.5 w-24 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-600 rounded-full" />
    </div>
  </div>
);

const Card = ({ title, description, icon: Icon, image, delay = 0 }: { title: string; description: string; icon: any; image: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
  >
    <div className="h-48 overflow-hidden relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="p-2 bg-yellow-400 rounded-lg text-black">
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <button className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
        Learn more <ChevronRight size={18} />
      </button>
    </div>
  </motion.div>
);

const TipItem = ({ icon: Icon, title, text }: { icon: any; title: string; text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

const CarnivalMap = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);

  const points = [
    { id: "sambadrome", name: "Sambadrome", x: 180, y: 100, color: "#EAB308", desc: "Main Parade Venue" },
    { id: "downtown", name: "Downtown (Praça XV)", x: 250, y: 120, color: "#22C55E", desc: "Major Bloco Hub" },
    { id: "copacabana", name: "Copacabana Palace", x: 220, y: 220, color: "#3B82F6", desc: "Magic Ball & Beach Blocos" },
    { id: "ipanema", name: "Ipanema (Posto 9)", x: 150, y: 250, color: "#EF4444", desc: "Iconic Beach Parties" },
  ];

  return (
    <div className="relative bg-blue-50/50 rounded-3xl p-4 border border-blue-100 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h5 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-1">Interactive Crowd Map</h5>
        <p className="text-xs text-blue-600">Click markers for key meeting points</p>
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-sm">
        {/* Simplified Rio Coastline */}
        <path 
          d="M 50,50 Q 150,30 250,50 T 350,100 L 350,250 Q 250,280 150,250 T 50,200 Z" 
          fill="#e2e8f0" 
          stroke="#cbd5e1" 
          strokeWidth="2"
        />
        
        {/* Main Routes */}
        <path d="M 180,100 L 250,120" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 4" opacity="0.5" />
        <path d="M 250,120 L 220,220" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 4" opacity="0.5" />
        <path d="M 220,220 L 150,250" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 4" opacity="0.5" />

        {/* Bloco Routes (Animated) */}
        <motion.path 
          d="M 150,250 L 100,240" 
          stroke="#EF4444" 
          strokeWidth="3" 
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 220,220 L 280,210" 
          stroke="#3B82F6" 
          strokeWidth="3" 
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Markers */}
        {points.map((pt) => (
          <g 
            key={pt.id} 
            className="cursor-pointer" 
            onClick={() => setActivePoint(pt.id === activePoint ? null : pt.id)}
          >
            <motion.circle 
              cx={pt.x} cy={pt.y} r="8" 
              fill={pt.color} 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.5 }}
              animate={activePoint === pt.id ? { r: 12 } : { r: 8 }}
            />
            <motion.circle 
              cx={pt.x} cy={pt.y} r="12" 
              stroke={pt.color} 
              strokeWidth="2" 
              fill="none"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>

      {/* Info Overlay */}
      <AnimatePresence>
        {activePoint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-2xl shadow-xl border border-blue-100 z-20"
          >
            <div className="flex justify-between items-start">
              <div>
                <h6 className="font-bold text-gray-900">{points.find(p => p.id === activePoint)?.name}</h6>
                <p className="text-xs text-gray-600">{points.find(p => p.id === activePoint)?.desc}</p>
              </div>
              <button onClick={() => setActivePoint(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 selection:bg-yellow-200">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">R</div>
            <span className={`font-bold text-xl tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}>RIO 2026</span>
          </div>
          <div className={`hidden md:flex gap-8 font-medium ${scrolled ? "text-gray-600" : "text-white/90"}`}>
            <a href="#history" className="hover:text-yellow-500 transition-colors">History</a>
            <a href="#sambadrome" className="hover:text-yellow-500 transition-colors">Sambadrome</a>
            <a href="#blocos" className="hover:text-yellow-500 transition-colors">Blocos</a>
            <a href="#culture" className="hover:text-yellow-500 transition-colors">Culture</a>
            <a href="#planner" className="hover:text-yellow-500 transition-colors">Planner</a>
          </div>
          <button className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full transition-all shadow-lg hover:scale-105 active:scale-95">
            Tickets
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=2000&v=2" 
            alt="Rio de Janeiro Landscape" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#fafafa]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-400 text-black font-bold rounded-full text-sm mb-6 tracking-wider uppercase">
              February 13 - 21, 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
              RIO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">CARNIVAL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Dive into the electrifying energy of the world's greatest party. A complete guide to experiencing Rio 2026 to the fullest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                <Ticket size={20} /> Buy Tickets
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Calendar size={20} /> View Schedule
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </header>

      {/* Participation: Join the Parade */}
      <section id="participation" className="py-24 bg-gradient-to-br from-green-600 to-blue-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&q=80&w=2000" alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-4 block">Be Part of the Show</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Don't just watch, <br /><span className="text-yellow-400">Parade with them!</span></h2>
              <p className="text-xl text-green-50 mb-8 leading-relaxed">
                Did you know that anyone can join a Samba School? You don't need to be a professional dancer. You just need to buy a costume (Fantasia) and learn the lyrics.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><ShoppingBag /></div>
                  <div>
                    <h4 className="font-bold text-xl">Buy your 'Fantasia'</h4>
                    <p className="text-green-100">Costumes go on sale online months before. Prices range from $150 to $500 depending on the school's rank.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><Music /></div>
                  <div>
                    <h4 className="font-bold text-xl">Learn the 'Samba-Enredo'</h4>
                    <p className="text-green-100">You must sing the school's anthem during the parade. It's part of the scoring criteria!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Parade Day Checklist</h3>
              <ul className="space-y-4">
                {[
                  "Arrive at the 'Concentração' 2 hours early",
                  "Wear comfortable shoes (you'll walk for 700m)",
                  "Hydrate well before putting on the heavy costume",
                  "Follow the 'Diretores de Harmonie' instructions",
                  "Smile and dance! The cameras are everywhere."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <CheckCircle className="text-yellow-400 shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 py-4 bg-yellow-400 text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl">
                FIND A COSTUME
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gastronomy Section */}
      <section id="gastronomy" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Fuel your carnival spirit with the best of Brazilian street food and traditional dishes.">
            A Taste of Carnival
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Feijoada", 
                desc: "The national dish. A hearty black bean stew with pork, traditionally served on Carnival Saturday.",
                img: "https://images.pexels.com/photos/34234280/pexels-photo-34234280.png?_gl=1*v5t0f*_ga*MTE1ODA0ODkwMC4xNzc2MTAyMTcw*_ga_8JE65Q40S6*czE3NzYxMDIxNzAkbzEkZzEkdDE3NzYxMDIxNzYkajU0JGwwJGgw" 
              },
              { 
                name: "Caipirinha", 
                desc: "Brazil's national cocktail made with cachaça, sugar, and lime. Refreshing and potent!",
                img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800" 
              },
              { 
                name: "Acarajé", 
                desc: "Deep-fried black-eyed pea balls filled with vatapá and shrimp. A Bahian classic found in Rio.",
                img: "https://images.pexels.com/photos/11722871/pexels-photo-11722871.jpeg?_gl=1*shse5y*_ga*MTE1ODA0ODkwMC4xNzc2MTAyMTcw*_ga_8JE65Q40S6*czE3NzYxMDIxNzAkbzEkZzEkdDE3NzYxMDI2MzAkajMzJGwwJGgw" 
              }
            ].map((food, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="h-48 overflow-hidden">
                  <img src={food.img} alt={food.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3 text-orange-500">
                    <Utensils size={18} />
                    <span className="font-bold uppercase text-xs tracking-widest">Must Try</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3">{food.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{food.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary & Culture */}
      <section id="culture" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Speak like a Local</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Carnival Glossary</h2>
              <p className="text-gray-600 mb-8">Master these terms to understand the commentators and the locals during the festivities.</p>
              <div className="p-6 bg-blue-600 rounded-3xl text-white">
                <h4 className="font-bold mb-2 flex items-center gap-2"><HelpCircle size={20} /> Did you know?</h4>
                <p className="text-blue-100 text-sm italic">"Samba" comes from the Kimbundu word "semba," referring to an invitation to dance.</p>
              </div>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                { term: "Abadá", def: "The official t-shirt that serves as your ticket for specific street parties or VIP areas." },
                { term: "Bateria", def: "The percussion section of a samba school. The heart and soul of the parade." },
                { term: "Enredo", def: "The theme chosen by a samba school for their parade, told through costumes and floats." },
                { term: "Mestre-Sala", def: "The 'Master of Ceremonies' who dances with the Flag Bearer (Porta-Bandeira)." },
                { term: "Concentração", def: "The area where schools gather and prepare just before entering the Sambadrome." },
                { term: "Recuo da Bateria", def: "The special niche in the Sambadrome where the drums stop to let the school pass." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                  <h5 className="font-black text-blue-600 mb-2">{item.term}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Social Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-green-50 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12 border border-green-100">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/20">
                <Leaf size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Green Carnival: <br /><span className="text-green-600">Sustainability Matters</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Rio is working hard to make Carnival more eco-friendly. From recycling tons of aluminum cans to using biodegradable glitter, the party is going green.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-gray-700">
                  <Sparkles className="text-green-500 shrink-0" size={20} />
                  <span><strong>Eco-Glitter:</strong> Avoid plastic micro-beads. Use mineral or seaweed-based glitter.</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <Sparkles className="text-green-500 shrink-0" size={20} />
                  <span><strong>Waste Management:</strong> Look for the 'Catadores' (collectors) who recycle 95% of cans.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.pexels.com/photos/22989049/pexels-photo-22989049.jpeg?_gl=1*akh8dt*_ga*MTE1ODA0ODkwMC4xNzc2MTAyMTcw*_ga_8JE65Q40S6*czE3NzYxMDIxNzAkbzEkZzEkdDE3NzYxMDI2OTEkajUyJGwwJGgw" alt="Eco Carnival" className="rounded-[2.5rem] shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Travel Planner Section */}
      <section id="planner" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-4 block">Your Journey Starts Here</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">Brazil Travel Planner</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to know to organize your trip from A to Z.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1: Logistics */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <ShieldCheck size={28} />
              </div>
              <h4 className="text-2xl font-bold mb-4">1. Logistics & Entry</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Visas:</strong> Check if your country requires an e-visa (US, Canada, Australia requirements vary).</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Health:</strong> Yellow fever vaccination is highly recommended. Get travel insurance.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Money:</strong> The currency is the Real (BRL). Cards are widely accepted, but keep some cash for street vendors.</span>
                </li>
              </ul>
            </div>

            {/* Step 2: Booking */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                <Calendar size={28} />
              </div>
              <h4 className="text-2xl font-bold mb-4">2. When to Book</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Flights:</strong> 6-8 months in advance for the best prices during peak season.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Accommodation:</strong> Hotels in Rio fill up fast. Book by September 2025 for the 2026 Carnival.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Tickets:</strong> Sambadrome tickets usually go on sale in late October.</span>
                </li>
              </ul>
            </div>

            {/* Step 3: Beyond Rio */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/20">
                <Map size={28} />
              </div>
              <h4 className="text-2xl font-bold mb-4">3. Beyond Rio</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Salvador:</strong> For an even more traditional, African-influenced carnival experience.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Iguazu Falls:</strong> A perfect 3-day post-carnival nature retreat.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                  <span><strong className="text-white">Amazon:</strong> Fly to Manaus for a deep dive into the world's largest rainforest.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 p-1 rounded-[3rem]">
            <div className="bg-gray-900 rounded-[2.9rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">Need a custom itinerary?</h3>
                <p className="text-gray-400">Download our full 14-day Brazil Discovery Guide (PDF).</p>
              </div>
              <button className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-yellow-400 transition-all transform hover:scale-105">
                DOWNLOAD GUIDE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Sambadrome */}
      <section id="sambadrome" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="The temple of samba, where the world's best schools compete in a spectacle of light and rhythm.">
            The Sambadrome
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              title="The Special Parade"
              description="The highlight of the carnival. The top 12 schools parade on Sunday and Monday nights."
              icon={Star}
              image="https://images.unsplash.com/photo-1568440439897-8a8ec4c03727?auto=format&fit=crop&q=80&w=800&v=2"
              delay={0.1}
            />
            <Card 
              title="Samba Schools"
              description="Each school chooses a theme (enredo) and prepares monumental floats and thousands of costumes."
              icon={Music}
              image="https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800&v=2"
              delay={0.2}
            />
            <Card 
              title="The Jury & Scoring"
              description="Schools are judged on 10 criteria: harmony, rhythm, floats, costumes, and more."
              icon={Users}
              image="https://images.unsplash.com/photo-1518112391173-50069794c118?auto=format&fit=crop&q=80&w=800&v=2"
              delay={0.3}
            />
          </div>

          <div className="mt-16 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-3xl font-bold mb-4">When to go?</h3>
                <p className="text-blue-100 text-lg mb-6">
                  The Special Group parades (the most prestigious) take place on the nights of February 15 and 16, 2026. The Champions' Parade, bringing together the top 6 schools, closes the festival on Saturday, February 21.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white/20 rounded-xl border border-white/30 text-sm font-bold">Feb 15: Special Group</div>
                  <div className="px-4 py-2 bg-white/20 rounded-xl border border-white/30 text-sm font-bold">Feb 16: Special Group</div>
                  <div className="px-4 py-2 bg-white/20 rounded-xl border border-white/30 text-sm font-bold">Feb 21: Champions' Parade</div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black shadow-2xl rotate-12">
                  <span className="text-sm font-bold uppercase">Tickets from</span>
                  <span className="text-5xl font-black">45€</span>
                  <span className="text-xs font-bold">Popular sectors</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="text-blue-600" /> 2026 Sambadrome Schedule
              </h4>
              <div className="space-y-4">
                {[
                  { date: "Fri Feb 13", event: "Gold Series Schools (Day 1)" },
                  { date: "Sat Feb 14", event: "Gold Series Schools (Day 2)" },
                  { date: "Sun Feb 15", event: "Special Group (Day 1) - Elite" },
                  { date: "Mon Feb 16", event: "Special Group (Day 2) - Elite" },
                  { date: "Tue Feb 17", event: "Children's Parade" },
                  { date: "Sat Feb 21", event: "The Champions' Parade" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <span className="font-bold text-gray-900">{item.date}</span>
                    <span className="text-gray-600">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-green-600" /> The Best Sectors
              </h4>
              <div className="space-y-4">
                {[
                  { sector: "Sectors 2 to 4", desc: "Near the start, high-energy atmosphere." },
                  { sector: "Sectors 5 to 9", desc: "Central view, best jury scores." },
                  { sector: "Sector 9", desc: "The tourist sector with numbered seats." },
                  { sector: "Sectors 10 to 11", desc: "Near the end, view of the entire avenue." },
                  { sector: "Camarotes", desc: "Luxury suites with open bar and buffet." },
                ].map((item, i) => (
                  <div key={i} className="py-3 border-b border-gray-200 last:border-0">
                    <span className="font-bold text-gray-900 block">{item.sector}</span>
                    <span className="text-sm text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Street Parties (Blocos) */}
      <section id="blocos" className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">The Soul of the Street</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Street Parties & Bands</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                The real carnival happens in the street. Street parties (blocos) are free and informal celebrations where thousands of people follow an orchestra. No rules, just joy.
              </p>
            </div>
            <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-lg flex items-center gap-2">
              <MapPin size={20} /> 2026 Street Party Map
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cordão do Bola Preta", type: "The Oldest", loc: "Downtown", img: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=500&v=2" },
              { name: "Banda de Ipanema", type: "Iconic & LGBT+", loc: "Ipanema", img: "https://images.unsplash.com/photo-1564659995441-461508821963?auto=format&fit=crop&q=80&w=500&v=2" },
              { name: "Sargento Pimenta", type: "Beatles in Samba", loc: "Flamengo", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=500&v=2" },
              { name: "Carmelitas", type: "Religious Theme", loc: "Santa Teresa", img: "https://images.unsplash.com/photo-1590424744295-983541adb44e?auto=format&fit=crop&q=80&w=500&v=2" }
            ].map((bloco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 rounded-[2rem] overflow-hidden shadow-lg"
              >
                <img src={bloco.img} alt={bloco.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">{bloco.type}</span>
                  <h4 className="text-xl font-bold text-white mb-1">{bloco.name}</h4>
                  <div className="flex items-center gap-1 text-white/70 text-sm">
                    <MapPin size={14} /> {bloco.loc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Balls & Parties */}
      <section id="bals" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="For those seeking elegance and exclusivity amidst the carnival madness.">
            Balls & Gala Nights
          </SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=1200&v=2" 
                  alt="Magic Ball Background" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -mr-48 -mt-48" />
              <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-6 block">The Most Prestigious</span>
              <h3 className="text-4xl font-bold mb-6">Magic Ball at Copacabana Palace</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                It is the most glamorous event in Rio. Evening wear or luxury costume required. Global celebrities and Brazilian high society gather here.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> Gourmet Buffet & Open Bar
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> Live Samba Orchestras
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> Spectacular Themed Decorations
                </li>
              </ul>
              <button className="w-full py-4 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-500 transition-all shadow-xl">
                Book My Spot
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Scala Ball</h4>
                <p className="text-gray-600">A series of famous themed balls, including the "Gay Ball" that closes the week in style.</p>
              </div>
              <div className="bg-purple-50 p-8 rounded-[2rem] border border-purple-100">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Yacht Club Parties</h4>
                <p className="text-gray-600">Private parties on the hills or near marinas for a more intimate atmosphere.</p>
              </div>
              <div className="bg-green-50 p-8 rounded-[2rem] border border-green-100">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Popular Balls</h4>
                <p className="text-gray-600">In Cinelândia Square, orchestras play for free for the public every night.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section id="conseils" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-3">
            <div className="lg:col-span-1 bg-blue-600 p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">Pro Tips</h3>
              <p className="text-blue-100 mb-10 leading-relaxed">
                The carnival can be overwhelming. Here's how to navigate the city like a local.
              </p>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Bus size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Transportation</p>
                    <p className="text-sm text-blue-100">Use the Metro. Buses and taxis are blocked by the parades.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Security</p>
                    <p className="text-sm text-blue-100">Leave your valuables at the hotel. Use a money belt.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Camera size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Photos</p>
                    <p className="text-sm text-blue-100">Be discreet with your phone in large crowds.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-12">
              <h4 className="text-2xl font-bold mb-8">Frequently Asked Questions</h4>
              <div className="grid md:grid-cols-2 gap-10">
                <TipItem 
                  icon={Ticket} 
                  title="Where to buy tickets?" 
                  text="Only through official resellers or at the Sambadrome ticket office. Avoid street vendors."
                />
                <TipItem 
                  icon={Info} 
                  title="How to dress?" 
                  text="For street parties: costumes, glitter, and light clothing. For the Sambadrome: casual but comfortable."
                />
                <TipItem 
                  icon={MapPin} 
                  title="Where to stay?" 
                  text="Ipanema and Copacabana are the most convenient, but prices triple. Santa Teresa is charming but more isolated."
                />
                <TipItem 
                  icon={Heart} 
                  title="Hydration" 
                  text="It is extremely hot (35°C+). Drink coconut water and mineral water constantly."
                />
              </div>

              <div className="mt-12 p-6 bg-yellow-50 border border-yellow-100 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-yellow-400 rounded-xl text-black">
                  <Info size={24} />
                </div>
                <p className="text-sm text-yellow-800 font-medium">
                  <strong>Important Note:</strong> Hotel reservations for 2026 are starting now. Don't wait, the best places are fully booked 6 months in advance.
                </p>
              </div>
            </div>
          </div>

          {/* New Safety Subsection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-red-600 p-8 text-white flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Security & Emergencies</h3>
                <p className="text-red-100">Your safety is our top priority during the festivities.</p>
              </div>
            </div>
            
            <div className="p-12 grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                  <Phone className="text-red-600" size={20} /> Emergency Numbers
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span className="font-semibold text-gray-700">Military Police</span>
                    <span className="text-xl font-black text-red-600">190</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span className="font-semibold text-gray-700">Ambulance (SAMU)</span>
                    <span className="text-xl font-black text-red-600">192</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span className="font-semibold text-gray-700">Firefighters</span>
                    <span className="text-xl font-black text-red-600">193</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div>
                      <span className="font-bold text-red-800 block">Tourist Police (DEAT)</span>
                      <span className="text-xs text-red-600">Specialized for foreign visitors</span>
                    </div>
                    <span className="text-lg font-black text-red-600">(21) 2332-2924</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                  <AlertTriangle className="text-orange-500" size={20} /> Navigating the Crowd
                </h4>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                      <Map size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Meeting Point</p>
                      <p className="text-sm text-gray-600">Always set a precise meeting point with your friends before entering a street party. Mobile networks often saturate.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                      <LifeBuoy size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">The 'Doleira' is Queen</p>
                      <p className="text-sm text-gray-600">Wear a money belt under your clothes for your money, cards, and phone. Keep nothing in your pockets.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Stay Together</p>
                      <p className="text-sm text-gray-600">In dense crowds, move in a 'caterpillar' formation by holding each other's shoulders to avoid losing a group member.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-1">
                <CarnivalMap />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">R</div>
              <span className="font-bold text-xl tracking-tight">RIO 2026</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              The unofficial guide to experiencing Rio Carnival 2026 like never before.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Camera size={18} />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Users size={18} />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h5>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#history" className="hover:text-yellow-400 transition-colors">History & Facts</a></li>
              <li><a href="#sambadrome" className="hover:text-yellow-400 transition-colors">Sambadrome</a></li>
              <li><a href="#planner" className="hover:text-yellow-400 transition-colors">Travel Planner</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Resources</h5>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Official Ticketing</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Metro Map</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Security Guide</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Samba History</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Newsletter</h5>
            <p className="text-gray-400 text-sm mb-4">Receive the latest updates on the 2026 schedule.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-yellow-400"
              />
              <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl hover:bg-yellow-500 transition-all">
                OK
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© 2026 Rio Carnival Guide. Inspired by travel stories and the passion for Brazil.</p>
        </div>
      </footer>
    </div>
  );
}
