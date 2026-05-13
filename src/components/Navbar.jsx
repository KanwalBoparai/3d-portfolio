import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));

  return (
    <nav
      className={`w-full flex items-center py-4 px-6 sm:px-16 fixed top-0 z-20 transition-all duration-500 ${
        scrolled
          ? "bg-[#EDE6D7]/80 backdrop-blur-lg border-b border-[#0A0908]/06 shadow-[0_8px_32px_rgba(10,9,8,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#FAF5EA] text-[13px] font-bold"
            style={{
              background: "linear-gradient(135deg, #EB4E1A, #D97706)",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 4px 12px rgba(235,78,26,0.3)",
            }}
          >
            KB
          </div>
          <span
            className="hidden sm:block font-semibold text-[#0A0908] group-hover:text-[#EB4E1A] transition-colors"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", letterSpacing: "-0.01em" }}
          >
            Kanwal Boparai
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="list-none hidden lg:flex flex-row gap-1">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setActive(nav.title)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 block ${
                  active === nav.title
                    ? "text-[#0A0908] bg-[#0A0908]/8 border border-[#0A0908]/10"
                    : "text-[#6B6258] hover:text-[#0A0908] hover:bg-[#0A0908]/5"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#6B6258] hover:text-[#0A0908] border border-[#0A0908]/8 hover:border-[#0A0908]/16 bg-white/40 hover:bg-white/70 backdrop-blur-sm transition-all duration-200"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
            title="Open command palette (⌘K)"
          >
            <span>Search</span>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#0A0908]/6 border border-[#0A0908]/10 rounded text-[9px]">
              ⌘K
            </kbd>
          </button>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#0A0908]/6 transition-colors text-[#0A0908]"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <img src={toggle ? close : menu} alt="menu" className="w-[22px] h-[22px] object-contain opacity-75" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-4 right-4 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(10,9,8,0.08)",
              boxShadow: "0 24px 60px rgba(10,9,8,0.18)",
              zIndex: 30,
            }}
          >
            <ul className="p-3 flex flex-col gap-1">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={() => { setToggle(false); setActive(nav.title); }}
                    className={`block px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${
                      active === nav.title
                        ? "text-[#0A0908] bg-[#0A0908]/8 border border-[#0A0908]/10"
                        : "text-[#6B6258] hover:text-[#0A0908] hover:bg-[#0A0908]/5"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
              <li className="pt-1 border-t border-[#0A0908]/6 mt-1">
                <button
                  onClick={() => { setToggle(false); openPalette(); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#6B6258] hover:text-[#0A0908] hover:bg-[#0A0908]/5 text-[13px] transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>Command palette</span>
                  <kbd className="px-1.5 py-0.5 bg-[#0A0908]/6 border border-[#0A0908]/10 rounded text-[10px] font-mono">⌘K</kbd>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
