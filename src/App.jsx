import { MotionConfig } from 'framer-motion';
import usePageRoute from './hooks/usePageRoute'
import ProjectPage from './components/ProjectPage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Clubs from './components/Clubs'
import Contact from './components/Contact'
import { ABOUT_TEXT } from "./constants"
import Aurora from './components/Aurora'
import Galaxy from './components/Galaxy'
import reignitionCover from './assets/projects/reignition-book-cover.jpg'
import dusklightBackground from './assets/projects/dusklight-faron-woods.jpg'

const App = () => {
  const route = usePageRoute();
  const isUnleashed = route.page === 'project' && route.slug === 'unleashed-recompiled';
  const isReignition = route.page === 'project' && route.slug === 'project-reignition';
  const isDusklight = route.page === 'project' && route.slug === 'dusklight';
  return (
    <MotionConfig reducedMotion="user">
    <div className={`isolate overflow-x-clip text-stone-300 antialiased relative ${isUnleashed ? 'unleashed-theme' : ''} ${isReignition ? 'reignition-theme' : ''} ${isDusklight ? 'dusklight-theme' : ''}`}>
      <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }}>Skip to content</a>
      {isUnleashed ? <div className="unleashed-sky fixed inset-0 -z-10" aria-hidden="true">
        <Galaxy density={1} glowIntensity={0.3} flareIntensity={1} starSpeed={0.5} mouseRepulsion={false} clickWarp={false} mouseInteraction={false} intro={false} dpr={1.5} />
      </div> : isReignition ? <div
        className="reignition-sky fixed inset-0 -z-10"
        aria-hidden="true"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(10, 5, 5, 0.72), rgba(12, 5, 4, 0.82)), url(${reignitionCover})` }}
      >
      </div> : isDusklight ? <div
        className="dusklight-sky fixed inset-0 -z-10"
        aria-hidden="true"
        style={{ backgroundImage: `url(${dusklightBackground})` }}
      >
      </div> : <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        </div>
      </div>}

      <div className="relative">
        {!isUnleashed && !isReignition && !isDusklight && <div className="absolute top-0 left-0 right-0 w-full h-[800px] z-0 pointer-events-none">
          <Aurora
            colorStops={["#7cff67","#B19EEF","#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>}
        <Navbar route={route} />
        <div className="container mx-auto px-4 sm:px-8 max-w-full relative z-10 pt-[84px] lg:pt-[94px]">
        <main id="main-content" tabIndex={-1}>
        {route.page === "project" ? <ProjectPage slug={route.slug} /> : <div className="home-content">
        <Hero />
        <Projects />
        <section id="experience"><Experience /></section>
        <Clubs />
        <section id="about" className="mx-auto max-w-6xl pt-12">
          <h2 className="animated-stone-gradient-text mb-6 text-center text-4xl">About</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-300">{ABOUT_TEXT}</p>
          <Technologies />
        </section>

        <section id="contact"><Contact /></section>
        </div>}
        </main>

        </div>
      </div>

    </div>
    </MotionConfig>
  )
}

export default App
