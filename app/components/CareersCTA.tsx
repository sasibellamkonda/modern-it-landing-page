"use client";

import { motion } from "framer-motion";

export default function CareersCTA() {
  return (
    <section id="careers" className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-[#0A0F1E]">

      {/* Aurora blobs — blue + orange */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0F1A2E]/60 to-[#0A0F1E]" />

        {/* Blue aurora */}
        <div
          className="aurora-1 absolute -top-1/4 left-1/4 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        {/* Orange aurora */}
        <div
          className="aurora-2 absolute top-1/4 right-1/4 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        {/* Deep blue aurora */}
        <div
          className="aurora-3 absolute bottom-0 left-1/3 w-[500px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(30,58,138,0.22) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        {/* Floating micro-orbs */}
        <motion.div animate={{ y: [-18, 18, -18], opacity: [0.35, 0.65, 0.35] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-1/4 w-3 h-3 bg-blue-400 rounded-full blur-[2px]" />
        <motion.div animate={{ y: [20, -20, 20], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-16 right-1/4 w-2 h-2 bg-orange-400 rounded-full blur-[2px]" />
        <motion.div animate={{ y: [-12, 12, -12], x: [8, -8, 8], opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-300 rounded-full blur-[2px]" />
        <motion.div animate={{ y: [15, -15, 15], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-orange-400 text-xs font-semibold tracking-wide uppercase">Now Hiring</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.08 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6"
        >
          Join Our Team.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.16 }}
          className="text-base md:text-lg text-slate-400 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto"
        >
          We&apos;re building a team of exceptional engineers, consultants, and strategists.
          If you thrive on solving complex problems and want to grow fast — this is your place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact"
            className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_36px_rgba(249,115,22,0.45)]">
            View Open Positions
          </a>
          <a href="mailto:careers@prakcorp.com"
            className="w-full sm:w-auto text-center border border-blue-600 hover:border-blue-400 hover:bg-blue-600/10 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105">
            careers@prakcorp.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-14"
        >
          {["Remote-friendly", "Competitive pay", "Fast growth", "Great culture"].map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {perk}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
