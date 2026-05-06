"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60 shadow-[0_1px_0_rgba(255,255,255,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 z-10">
            <span className="bg-white rounded-md px-2.5 py-1 inline-flex">
              <Image src="/prak-logo.png" alt="PrakCorp" width={110} height={36} className="h-7 w-auto" priority />
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <NavLink key={link} href={`#${link.toLowerCase()}`}>{link}</NavLink>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3 z-10">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_22px_rgba(59,130,246,0.4)]"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={mobileOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                  transition={{ duration: 0.2 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-0 z-40 bg-slate-950 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-2 w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 200, damping: 22 }}
                  className="w-full text-center text-2xl font-semibold text-slate-300 hover:text-white py-3 min-h-[56px] flex items-center justify-center border-b border-slate-800/60 last:border-0 transition-colors duration-150"
                >
                  {link}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, type: "spring", stiffness: 200, damping: 22 }}
                className="mt-6 w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 min-h-[56px] flex items-center justify-center"
              >
                Get Started
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
