import { BrowserRouter } from "react-router-dom";
import views from './assets/views.mp4';
import "./App.css";

import { About, Contact, Experience, Hero, Navbar, Tech, Skills, Projects, Education, Leadership, AdditionalInfo, StarsCanvas } from "./components";
import FloatingParticles from "./components/FloatingParticles";
import ParticleBackground from "./components/ParticleBackground";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-hero-gradient min-h-screen'>
        <FloatingParticles />
        <div className='video-container relative z-10'>
          <video className='videoTag' autoPlay loop muted style={{opacity: 0.1}}>
            <source src={views} type='video/mp4' />
          </video>
          <div className='content-overlay bg-cover bg-no-repeat bg-center'>
            <ParticleBackground />
            <Navbar />
            <Hero />
          </div>
        </div>

        <About />
        <Education />
        <Experience />
        <Skills />
        <Leadership />
        <Projects />
        <AdditionalInfo />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
