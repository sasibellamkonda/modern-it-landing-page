"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10, suffix: "+", label: "Years of Expertise" },
  { value: 50, suffix: "+", label: "Enterprise Clients" },
  { value: 15, suffix: "+", label: "Industries Served" },
];

const bullets = [
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    title: "Deep Domain Expertise",
    desc: "Our consultants carry 10+ years of hands-on experience across AI, cloud, and enterprise software — not just theory.",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    title: "Cross-Industry Reach",
    desc: "From healthcare and finance to energy and manufacturing — we understand the regulatory, operational, and technical nuances of each vertical.",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Outcome-Driven Delivery",
    desc: "Agile sprints, transparent milestones, and a focus on business outcomes — not just code shipped. We measure success by your ROI.",
  },
];

function Counter({ end, suffix, trigger }: { end: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger || done) return;
    setDone(true);
    const duration = 2000;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end, done]);

  return (
    <span className={count > 0 ? "num-glow" : ""}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-slate-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4"
            >
              About Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8"
            >
              Why Prak Corporation?
            </motion.h2>

            <div className="flex flex-col gap-7">
              {bullets.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{b.title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — animated stat counters */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.12 }}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 relative overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.07)]"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-all duration-500" />
                <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-1 md:mb-2 transition-all duration-300">
                  <Counter end={stat.value} suffix={stat.suffix} trigger={inView} />
                </p>
                <p className="text-slate-400 text-sm md:text-base font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
