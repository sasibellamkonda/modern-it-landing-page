"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  { label: "Application Support",   color: "from-blue-700 to-blue-900",         icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { label: "App Modernization",      color: "from-[#1E3A8A] to-blue-700",        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
  { label: "AI & ML",               color: "from-orange-600 to-orange-800",      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
  { label: "Cloud Services",        color: "from-blue-600 to-[#1E3A8A]",         icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
  { label: "DevOps",                color: "from-[#2563EB] to-blue-800",         icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Data Security",         color: "from-orange-500 to-orange-700",      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  { label: "Analytics",             color: "from-blue-700 to-blue-900",          icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Quality Engineering",   color: "from-[#1E3A8A] to-[#2563EB]",       icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
];

const N = services.length;
const ANGLE_STEP = 360 / N;
const RADIUS = 420;

export default function ServicesStrip() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative py-14 md:py-20 bg-[#0A0F1E] border-y border-[#1E3A8A]/30 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-slate-500 text-xs font-semibold tracking-widest uppercase mb-10"
      >
        Our Services
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-36 sm:h-44 md:h-52 flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0A0F1E] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0A0F1E] to-transparent z-20 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center scale-[0.52] sm:scale-[0.72] md:scale-100 origin-center"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 40%" }}
        >
          <div className="carousel-track relative w-0 h-0" style={{ transformStyle: "preserve-3d" }}
            onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          >
            <div className={`carousel-track absolute inset-0 ${paused ? "paused" : ""}`} style={{ transformStyle: "preserve-3d" }}>
              {services.map((svc, i) => (
                <div
                  key={svc.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px) translateX(-50%) translateY(-50%)`,
                    transformStyle: "preserve-3d",
                    width: "200px",
                  }}
                >
                  <div className={`bg-gradient-to-br ${svc.color} border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-sm cursor-default select-none`}>
                    <div className="text-white/90">{svc.icon}</div>
                    <p className="text-white font-semibold text-sm text-center leading-tight">{svc.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <p className="text-center text-slate-600 text-xs mt-8 tracking-wide">
        Hover to pause · Drag to explore
      </p>
    </section>
  );
}
