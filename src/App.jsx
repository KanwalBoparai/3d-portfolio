import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas  } from "./components";
import { Stars } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { StarsCanvasNew } from "./components/canvas";


const App = () => {

  return (
    <BrowserRouter>
      <div>
        <div className='bg-center'>
          <Navbar />
          <Hero />
        </div>
        <StarsCanvasNew />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </BrowserRouter>
  )
}

export default App
