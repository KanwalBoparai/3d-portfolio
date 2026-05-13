import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../constants";

const COMMANDS = [
  ...navLinks.map((nav) => ({
    id: nav.id,
    label: nav.title,
    category: "Navigate",
    action: () => {
      const el = document.getElementById(nav.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    icon: "→",
  })),
  {
    id: "github",
    label: "GitHub Profile",
    category: "Links",
    action: () => window.open("https://github.com/KanwalBoparai", "_blank"),
    icon: "↗",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    category: "Links",
    action: () => window.open("https://linkedin.com/in/kanwalboparai", "_blank"),
    icon: "↗",
  },
  {
    id: "email",
    label: "Send Email",
    category: "Links",
    action: () => window.open("mailto:kanwalgurnoorboparai@gmail.com", "_blank"),
    icon: "✉",
  },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const runSelected = useCallback(() => {
    if (filtered[selected]) {
      filtered[selected].action();
      setOpen(false);
      setQuery("");
    }
  }, [filtered, selected]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSelected();
    }
  };

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="command-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="command-panel mx-4"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#0A0908]/6">
                <span className="text-[#EB4E1A] opacity-70 text-sm font-mono">⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Navigate, search, or run a command…"
                  className="flex-1 bg-transparent text-[#0A0908] placeholder-[#6B6258]/50 text-sm outline-none font-sans"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-0.5 text-[10px] text-[#6B6258] bg-[#0A0908]/5 border border-[#0A0908]/10 rounded font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-[360px] overflow-y-auto">
                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-center text-[#6B6258] text-sm font-mono">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
                {categories.map((cat) => {
                  const items = filtered.filter((c) => c.category === cat);
                  return (
                    <div key={cat}>
                      <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-[#6B6258]/60 font-mono">
                        {cat}
                      </p>
                      {items.map((cmd) => {
                        const idx = filtered.indexOf(cmd);
                        return (
                          <button
                            key={cmd.id}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              idx === selected
                                ? "bg-[#EB4E1A]/8 text-[#0A0908]"
                                : "text-[#6B6258] hover:bg-[#0A0908]/4 hover:text-[#0A0908]"
                            }`}
                            onMouseEnter={() => setSelected(idx)}
                            onClick={() => { cmd.action(); setOpen(false); setQuery(""); }}
                          >
                            <span className={`w-5 text-center text-sm ${idx === selected ? "text-[#EB4E1A]" : "text-[#6B6258]/40"}`}>
                              {cmd.icon}
                            </span>
                            <span className="text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {cmd.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-[#0A0908]/5 flex items-center gap-4 text-[#6B6258]/50">
                <span className="text-[10px] font-mono flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-[#0A0908]/5 border border-[#0A0908]/10 rounded text-[9px]">↑↓</kbd>
                  navigate
                </span>
                <span className="text-[10px] font-mono flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-[#0A0908]/5 border border-[#0A0908]/10 rounded text-[9px]">↵</kbd>
                  open
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
