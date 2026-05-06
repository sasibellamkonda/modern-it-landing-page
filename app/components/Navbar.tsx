"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = ["Services", "Technology", "Industries", "Careers", "About", "Contact"];

function NavLink({ href, children }: { href: string; children: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 pb-0.5"
    >
      {children}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-blue-400"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 shadow-[0_1px_0_rgba(255,255,255,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="font-bold text-white text-lg tracking-tight">
              <span className="text-blue-400">Prak</span>Corp
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink key={link} href={`#${link.toLowerCase()}`}>{link}</NavLink>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_22px_rgba(59,130,246,0.4)]"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-slate-300 hover:text-white text-base font-medium transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-full transition-all duration-200"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
