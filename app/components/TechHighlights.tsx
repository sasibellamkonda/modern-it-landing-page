"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>,
    tag: "Strategy + Execution",
    title: "Digital Transformation",
    desc1: "We map your digital roadmap, identify quick wins, and architect long-term change programs that align technology with business strategy.",
    desc2: "From legacy modernization to AI adoption — we make transformation tangible and measurable.",
  },
  {
    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    tag: "Multi-Cloud Expertise",
    title: "Cloud Transformation",
    desc1: "Whether you're migrating to AWS, Azure, or GCP — or operating across all three — we design cloud architectures built for resilience and scale.",
    desc2: "FinOps-driven optimization ensures your cloud spend directly supports business growth.",
  },
  {
    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
    tag: "24/7 Operations",
    title: "Managed Services",
    desc1: "Proactive monitoring, incident management, and continuous optimization across your full technology stack — so your team can focus on what matters.",
    desc2: "SLA-backed support with dedicated engineers who know your environment inside out.",
  },
];

export default function TechHighlights() {
  return (
    <section id="technology" className="py-16 md:py-24 lg:py-32 bg-[#0A0F1E]">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">Technology</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Three Pillars of Our Practice
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.12 }}
              className="group relative bg-[#0F1A2E] border border-[#1E3A8A]/30 rounded-2xl p-6 md:p-8 flex flex-col gap-5 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#3B82F6]/50 hover:shadow-[0_0_55px_rgba(59,130,246,0.1)]"
            >
              {/* Animated top border glow — blue */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400"
              >
                {p.icon}
              </motion.div>

              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-orange-500">{p.tag}</p>
                <h3 className="text-white font-bold text-xl mb-4">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{p.desc1}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc2}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
