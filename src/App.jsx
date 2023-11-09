import { BrowserRouter } from "react-router-dom";
import views from './assets/views.mp4';
import "./App.css";

import { About, Contact, Experience, Hero, Navbar,
  // Tech,
   Projects, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-blue'>
        <div className='video-container'>
          <video className='videoTag' autoPlay loop muted>
            <source src={views} type='video/mp4' />
          </video>
          <div className='content-overlay bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
        </div>

        <About />
        <Experience />
        {/* <Tech /> */}
        <Projects />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App