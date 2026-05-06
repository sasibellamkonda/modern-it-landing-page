"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { quote: "Prak Corporation modernized our entire claims processing platform in under six months. Their AI-driven automation reduced manual effort by 60% and gave our team time back to focus on patients.", name: "Sarah M.", role: "CTO, Regional Healthcare Network", initials: "SM", accent: "blue" },
  { quote: "The cloud migration was seamless. Their architects anticipated every bottleneck before it became a problem. We went from on-premise to fully cloud-native with zero downtime.", name: "James L.", role: "VP of Technology, Energy Firm", initials: "JL", accent: "purple" },
  { quote: "Exceptional DevOps team. They built us a CI/CD pipeline that cut our release cycle from bi-weekly to daily. Our engineering team is more productive than ever.", name: "Priya K.", role: "Engineering Director, FinTech Company", initials: "PK", accent: "blue" },
];

function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, j) => (
        <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className={`bg-slate-800/60 border rounded-2xl p-6 md:p-8 flex flex-col gap-5 md:gap-6 h-full ${
      t.accent === "blue" ? "border-slate-700" : "border-slate-700"
    }`}>
      <Stars />
      <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-2 border-t border-slate-700/60">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${t.accent === "blue" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
          {t.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-slate-500 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  const paginate = (dir: number) => {
    setCurrent((prev) => Math.max(0, Math.min(testimonials.length - 1, prev + dir)));
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-purple-700/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4">Client Stories</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Leaders Across Industries
          </h2>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              className={`group transition-all duration-300 cursor-default hover:border-blue-500/40 hover:shadow-[0_0_45px_rgba(59,130,246,0.09)]`}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: swipeable single card */}
        <div className="md:hidden">
          <div className="overflow-hidden relative">
            <AnimatePresence mode="wait" custom={dragDirection}>
              <motion.div
                key={current}
                custom={dragDirection}
                initial={{ opacity: 0, x: dragDirection > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dragDirection > 0 ? -80 : 80 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 300;
                  if (swipe) {
                    const dir = offset.x < 0 ? 1 : -1;
                    setDragDirection(dir);
                    paginate(dir);
                  }
                }}
                className="touch-pan-y cursor-grab active:cursor-grabbing"
              >
                <TestimonialCard t={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => { setDragDirection(-1); paginate(-1); }}
              disabled={current === 0}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-slate-700 text-slate-400 disabled:opacity-30 hover:border-blue-500/50 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDragDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 min-w-[8px] ${i === current ? "bg-blue-400 w-5" : "bg-slate-600"}`}
                />
              ))}
            </div>
            <button
              onClick={() => { setDragDirection(1); paginate(1); }}
              disabled={current === testimonials.length - 1}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-slate-700 text-slate-400 disabled:opacity-30 hover:border-blue-500/50 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-center text-slate-600 text-xs mt-3 tracking-wide">Swipe to navigate</p>
        </div>
      </div>
    </section>
  );
}
