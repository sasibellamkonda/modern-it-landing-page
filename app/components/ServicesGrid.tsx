"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const services = [
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: "AI & Machine Learning", desc: "From predictive models to LLM-powered workflows, we build AI solutions that create measurable business advantage.", accent: "blue" },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>, title: "Cloud Services", desc: "Strategy, migration, and optimization across AWS, Azure, and GCP. We architect scalable, cost-efficient cloud platforms.", accent: "purple" },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: "DevOps & Automation", desc: "CI/CD pipelines, infrastructure-as-code, and release automation that compress deployment cycles from weeks to hours.", accent: "blue" },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>, title: "App Modernization", desc: "Lift-and-shift to lift-and-transform. We re-architect legacy systems into cloud-native, microservices-based applications.", accent: "purple" },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: "Data Security", desc: "End-to-end security architecture, compliance frameworks, and threat mitigation — keeping your data protected at every layer.", accent: "blue" },
  { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: "Analytics & Insights", desc: "Modern data platforms, real-time dashboards, and ML-powered analytics that turn raw data into strategic intelligence.", accent: "purple" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } } };

function HoloCard({ svc }: { svc: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Spring-smoothed tilt values */
  const rotX = useSpring(0, { stiffness: 280, damping: 22 });
  const rotY = useSpring(0, { stiffness: 280, damping: 22 });
  const liftY = useSpring(0, { stiffness: 300, damping: 24 });

  /* Shine position */
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const isBlue = svc.accent === "blue";

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;   // 0..1
    const ny = (e.clientY - rect.top)  / rect.height;  // 0..1

    /* Tilt: ±14 degrees */
    rotX.set((ny - 0.5) * -28);
    rotY.set((nx - 0.5) * 28);

    setShine({ x: nx * 100, y: ny * 100, opacity: 1 });
  };

  const onEnter = () => { setHovered(true);  liftY.set(-10); };
  const onLeave = () => {
    setHovered(false);
    rotX.set(0); rotY.set(0); liftY.set(0);
    setShine((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <motion.div variants={item} style={{ perspective: "900px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, y: liftY, transformStyle: "preserve-3d" }}
        className={`group relative bg-slate-900 border rounded-2xl p-7 flex flex-col gap-4 overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-300 ${
          hovered
            ? isBlue
              ? "border-blue-500/60 card-glow"
              : "border-purple-500/60 card-glow-purple"
            : "border-slate-800"
        }`}
      >
        {/* Holographic shine — follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.09) 0%, transparent 52%)`,
            opacity: shine.opacity,
          }}
        />

        {/* Rainbow foil shimmer (always on, very subtle) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(105deg, transparent 20%, rgba(99,102,241,0.06) 40%, rgba(139,92,246,0.08) 50%, rgba(59,130,246,0.06) 60%, transparent 80%)`,
          }}
        />

        {/* Animated top border glow */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isBlue ? "from-transparent via-blue-500 to-transparent" : "from-transparent via-purple-500 to-transparent"}`} />

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isBlue ? "bg-blue-500/10 border border-blue-500/20 text-blue-400" : "bg-purple-500/10 border border-purple-500/20 text-purple-400"}`}>
          {svc.icon}
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-2">{svc.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
        </div>

        <div className="mt-auto">
          <span className={`inline-flex items-center gap-1 text-sm font-medium transition-all duration-200 ${isBlue ? "text-blue-400 group-hover:text-blue-300" : "text-purple-400 group-hover:text-purple-300"}`}>
            Learn More
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 md:py-32 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            End-to-End IT Services Built for Enterprise Scale
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc) => <HoloCard key={svc.title} svc={svc} />)}
        </motion.div>
      </div>
    </section>
  );
}
