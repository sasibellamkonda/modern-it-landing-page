"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contactDetails = [
  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "Dallas, Texas", sub: "Headquarters" },
  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: "info@prakcorp.com", sub: "Email us anytime" },
  { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "+1 (972) 555-0100", sub: "Mon–Fri, 8am–6pm CST" },
];

const socials = [
  { label: "LinkedIn", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { label: "Twitter", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { label: "GitHub", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
];

const fieldDefs = [
  { name: "name", label: "Name", type: "text", placeholder: "Jane Smith", half: true },
  { name: "email", label: "Email", type: "email", placeholder: "jane@company.com", half: true },
  { name: "company", label: "Company", type: "text", placeholder: "Acme Corp", half: false },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell us about your project or challenge...", half: false },
];

export default function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Start a Conversation
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Whether you need a technology roadmap, a dedicated team, or just want to explore what&apos;s possible — we&apos;re here.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{detail.label}</p>
                    <p className="text-slate-500 text-sm">{detail.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-800">
              <p className="text-slate-400 text-sm mb-4">Follow us</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-slate-700 transition-all duration-200">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <div ref={formRef} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 gap-4 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                <p className="text-slate-400 text-sm max-w-xs">Thanks for reaching out. We&apos;ll be in touch within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Staggered fields grid */}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {fieldDefs.filter((f) => f.half).map((field, i) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: -28 }}
                      animate={formInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ type: "spring", stiffness: 120, damping: 20, delay: i * 0.1 }}
                    >
                      <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">{field.label}</label>
                      <input name={field.name} type={field.type} value={(form as Record<string, string>)[field.name]}
                        onChange={handleChange} required placeholder={field.placeholder}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-200" />
                    </motion.div>
                  ))}
                </div>

                {fieldDefs.filter((f) => !f.half).map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -28 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 + i * 0.1 }}
                    className="mb-5"
                  >
                    <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea name={field.name} value={(form as Record<string, string>)[field.name]}
                        onChange={handleChange} required rows={5} placeholder={field.placeholder}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none" />
                    ) : (
                      <input name={field.name} type={field.type} value={(form as Record<string, string>)[field.name]}
                        onChange={handleChange} placeholder={field.placeholder}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-200" />
                    )}
                  </motion.div>
                ))}

                {/* Pulsing submit button */}
                <motion.button
                  type="submit"
                  animate={{ boxShadow: ["0 0 0 0px rgba(59,130,246,0)", "0 0 0 10px rgba(59,130,246,0.1)", "0 0 0 0px rgba(59,130,246,0)"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
