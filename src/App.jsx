import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import "./App.css";

import {
  About, Contact, Experience, Hero, Navbar,
  Skills, Projects, Education, Leadership, AdditionalInfo,
} from "./components";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      {/* Custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* All scrollable content — light cinematic bg comes from CSS */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Leadership />
        <Projects />
        <AdditionalInfo />
        <Contact />
      </div>

      {/* Global command palette */}
      <CommandPalette />
    </BrowserRouter>
  );
};

export default App;
