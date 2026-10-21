import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { HERO_CONTENT } from "../constants";

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const media = `${import.meta.env.BASE_URL}media/`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
    else video.play().catch(() => setPlaying(false));
  }, [reducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <section id="home" className="hero-section mx-auto grid max-w-7xl items-center gap-6 py-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
      <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
        <h1 className="animated-gradient-text pb-3 text-4xl tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl">Alejandro Pérez</h1>
        <p className="text-2xl font-medium text-stone-100 sm:text-3xl">Software Engineer</p>
        <p className="mx-auto my-6 max-w-xl text-left text-lg leading-relaxed text-stone-300 lg:mx-0">{HERO_CONTENT}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#projects" className="hero-action rounded-full bg-white text-lg text-stone-800 shadow-sm transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">View Projects <span aria-hidden="true">↗</span></a>
          <motion.a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download="Alejandro_Perez_Resume.pdf"
            className="hero-action relative max-w-full overflow-hidden rounded-full bg-white text-lg text-stone-800 shadow-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] focus-visible:scale-105"
            whileHover="hover"
            whileFocus="hover"
            initial="initial"
          >
            <motion.div variants={{ initial: { y: 0, opacity: 1 }, hover: { y: -20, opacity: 0 } }} transition={{ duration: 0.3, ease: "easeInOut" }}>Download Resume</motion.div>
            <motion.div aria-hidden="true" variants={{ initial: { y: 20, opacity: 0 }, hover: { y: 0, opacity: 1 } }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center">Download Resume <FaArrowDown className="ml-2" /></motion.div>
          </motion.a>
        </div>
      </div>
      <div className="order-1 mx-auto w-full max-w-[416px] min-w-0 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-300 to-stone-900 p-[3px] shadow-2xl lg:order-2 lg:mx-0 lg:max-w-none">
        <div className="overflow-hidden rounded-[21px] bg-stone-950">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-[10px] lg:px-5 lg:py-4 lg:text-xs font-semibold uppercase tracking-widest text-stone-300">
            <span><span className="lg:hidden">Featured project</span><span className="hidden lg:inline">Featured engineering project</span></span><span className="text-green-300">Native iOS port</span>
          </div>
          <div className="relative aspect-[5/4] bg-black lg:aspect-[4/3]">
            <img src={`${media}sonic-unleashed-fallback.jpg`} alt="Sonic Unleashed cover art" className="absolute inset-0 h-full w-full object-contain" />
            {!failed && !reducedMotion && <video ref={videoRef} src={`${media}sonic-ios-preview.mp4`} poster={`${media}sonic-unleashed-fallback.jpg`} muted loop playsInline preload="metadata" onError={() => setFailed(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Sonic Unleashed iOS port gameplay with touchscreen controls" className="relative h-full w-full bg-black object-contain" />}
            {!failed && !reducedMotion && <button type="button" onClick={togglePlayback} className="absolute bottom-3 right-3 rounded-full border border-white/30 bg-black/80 px-4 py-2 text-sm text-white hover:bg-black" aria-label={playing ? "Pause gameplay preview" : "Play gameplay preview"}>{playing ? "Pause" : "Play preview"}</button>}
          </div>
          <a href="#/projects/unleashed-recompiled" className="block px-4 py-3 transition lg:px-5 lg:py-5 hover:bg-stone-900">
            <h2 className="text-base font-semibold text-white lg:text-xl">Sonic Unleashed — iOS Port <span aria-hidden="true">↗</span></h2>
            <p className="mt-2 hidden text-sm leading-relaxed text-stone-400 lg:block">Unleashed Recompiled running on iOS with native Metal rendering and touchscreen controls.</p>
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
