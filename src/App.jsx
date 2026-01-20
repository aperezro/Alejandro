import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Clubs from './components/Clubs'
import Aurora from './components/Aurora'

const App = () => {
  return (
    <div className="overflow-x-hidden text-stone-300 antialiased relative">
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 w-full h-[800px] z-0 pointer-events-none">
          <Aurora
            colorStops={["#7cff67","#B19EEF","#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-8 max-w-full overflow-hidden relative z-10">
        <Navbar />
        <Hero />
        <Technologies />
        <Experience />
        <Projects />
    
        <Contact />
        
        </div>
      </div>

    </div>
  )
}

export default App