import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import logo from "../assets/alejandroLogo.svg";
import { FaLinkedin, FaGithub, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { PROJECT_PAGES, projectPageTitle } from '../constants';

const Navbar = ({ route }) => {
  const [highlight, setHighlight] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef(null);
  const mobileAnimationsRef = useRef([]);
  const previousBodyOverflowRef = useRef(null);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const close = event => {
      if (!dropdownRef.current?.contains(event.target)) setOpen(false);
    };
    const escape = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    if (open) {
      document.addEventListener('pointerdown', close);
      document.addEventListener('keydown', escape);
    }
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = dialog.querySelector('.mobile-navigation-panel');
    const shade = dialog.querySelector('.mobile-navigation-shade');
    const wasOpen = dialog.open;
    const currentTransform = getComputedStyle(panel).transform;
    const currentOpacity = getComputedStyle(shade).opacity;
    mobileAnimationsRef.current.forEach(animation => animation.cancel());
    mobileAnimationsRef.current = [];
    const duration = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : mobileOpen ? 340 : 260;
    let cancelled = false;

    if (mobileOpen) {
      if (previousBodyOverflowRef.current === null) {
        previousBodyOverflowRef.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      // Focus the visible dialog before moving its panel offscreen, so native
      // autofocus cannot scroll the drawer sideways during the first frame.
      if (!wasOpen) dialog.showModal();
      const slide = panel.animate([
        { transform: wasOpen ? currentTransform : 'translate3d(100%, 0, 0)' },
        { transform: 'translate3d(0, 0, 0)' }
      ], { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' });
      const fade = shade.animate([{ opacity: wasOpen ? currentOpacity : 0 }, { opacity: 1 }], { duration, easing: 'ease-out', fill: 'both' });
      mobileAnimationsRef.current = [slide, fade];
    } else if (wasOpen) {
      const slide = panel.animate([
        { transform: currentTransform },
        { transform: 'translate3d(100%, 0, 0)' }
      ], { duration, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'both' });
      const fade = shade.animate([{ opacity: currentOpacity }, { opacity: 0 }], { duration, easing: 'ease-in', fill: 'both' });
      mobileAnimationsRef.current = [slide, fade];
      Promise.all([slide.finished, fade.finished]).then(() => {
        if (cancelled) return;
        dialog.close();
        document.body.style.overflow = previousBodyOverflowRef.current ?? '';
        previousBodyOverflowRef.current = null;
      }).catch(() => {}); // A quick reopen cancels the previous exit.
    }
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => {
      cancelled = true;
      desktop.removeEventListener('change', onResize);
    };
  }, [mobileOpen, reducedMotion]);

  useEffect(() => () => {
    mobileAnimationsRef.current.forEach(animation => animation.cancel());
    if (previousBodyOverflowRef.current !== null) {
      document.body.style.overflow = previousBodyOverflowRef.current;
      previousBodyOverflowRef.current = null;
    }
  }, []);

  const pill = name => highlight === name && <motion.span layoutId="nav-highlight" className="pointer-events-none absolute inset-0 rounded-full bg-white" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 35 }} />;
  const itemClass = name => `nav-pill-item relative flex shrink-0 items-center rounded-full text-sm font-medium ${highlight === name ? 'text-black' : 'text-stone-300'}`;
  const closeDropdown = () => { setOpen(false); setMobileOpen(false); };

  return (
    <div className="site-header fixed inset-x-0 top-0 z-40">
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
      <a href="#home" aria-label="Alejandro Pérez home" onClick={closeDropdown} className="flex items-center gap-2 font-semibold text-white">
        <img src={logo} width={70} height={35} alt="" /><span className="hidden xl:inline">Alejandro Pérez</span>
      </a>
      <nav aria-label="Main navigation" className="nav-pill order-3 hidden w-full flex-wrap items-center justify-center gap-1 rounded-[28px] border border-white/15 bg-black p-1.5 shadow-lg lg:order-none lg:flex lg:w-auto" onMouseLeave={() => setHighlight(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHighlight(null); }}>
        <div ref={dropdownRef} className={itemClass('Projects')} onMouseEnter={() => setHighlight('Projects')} onFocus={() => setHighlight('Projects')}>
          {pill('Projects')}
          <a href="#projects" onClick={closeDropdown} className="relative z-10 rounded-full py-2.5 pl-4 pr-1">Projects</a>
          <button ref={toggleRef} type="button" aria-label="Browse project pages" aria-expanded={open} aria-controls="project-dropdown" onClick={() => setOpen(value => !value)} className="relative z-10 rounded-full py-3 pl-2 pr-4"><FaChevronDown className={`text-[10px] transition-transform ${open ? 'rotate-180' : ''}`} /></button>
          <AnimatePresence>
            {open && <motion.div id="project-dropdown" initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: 0.18 }} className="project-dropdown absolute left-0 top-[calc(100%+12px)] z-50 w-[calc(100vw-96px)] sm:w-80 rounded-2xl border border-white/20 bg-stone-950 p-2 shadow-2xl">
              <a href="#projects" onClick={closeDropdown} className="block rounded-xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">All Projects ↗</a>
              <div className="my-1 border-t border-white/10" />
              {PROJECT_PAGES.map(project => <a key={project.slug} href={`#/projects/${project.slug}`} aria-current={route.slug === project.slug ? 'page' : undefined} onClick={closeDropdown} className={`block rounded-xl px-4 py-3 text-sm leading-snug hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black ${route.slug === project.slug ? 'bg-white/15 text-white' : 'text-stone-300'}`}>{projectPageTitle(project)}</a>)}
            </motion.div>}
          </AnimatePresence>
        </div>
        {[['Experience', '#experience'], ['About', '#about'], ['Resume', `${import.meta.env.BASE_URL}resume.pdf`], ['Contact', '#contact']].map(([label, href]) => <div key={label} className={itemClass(label)} onMouseEnter={() => setHighlight(label)} onFocus={() => setHighlight(label)}>
          {pill(label)}
          <a href={href} onClick={closeDropdown} {...(label === 'Resume' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="relative z-10 rounded-full px-3 py-2.5 sm:px-4">{label}</a>
        </div>)}
      </nav>
      <div className="flex gap-4 text-2xl">
        <a href="https://www.linkedin.com/in/aperezro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] focus-visible:scale-110"><FaLinkedin /></a>
        <a href="https://github.com/aperezro/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] focus-visible:scale-110"><FaGithub /></a>
        <button type="button" aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black text-xl text-white lg:hidden"><FaBars /></button>
      </div>
      {createPortal(
        <dialog ref={dialogRef} id="mobile-navigation" aria-label="Mobile navigation" className="mobile-navigation" onCancel={event => { event.preventDefault(); setMobileOpen(false); }} onClose={() => setMobileOpen(false)} onClick={event => { if (event.target === event.currentTarget || event.target.classList.contains('mobile-navigation-shade')) setMobileOpen(false); }}>
          <div className="mobile-navigation-shade" aria-hidden="true" />
          <div className="mobile-navigation-panel">
            <div className="mb-8 flex items-center justify-between"><span className="text-lg font-semibold">Navigation</span><button type="button" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 text-xl"><FaTimes /></button></div>
            <nav aria-label="Mobile main navigation" className="flex flex-col gap-2">
              <a href="#home" onClick={closeDropdown} className="mobile-menu-link">Home</a>
              <a href="#projects" onClick={closeDropdown} className="mobile-menu-link">All Projects</a>
              <div className="mb-3 ml-4 border-l border-stone-700 pl-3">{PROJECT_PAGES.map(project => <a key={project.slug} href={`#/projects/${project.slug}`} aria-current={route.slug === project.slug ? 'page' : undefined} onClick={closeDropdown} className="block rounded-xl px-3 py-3 text-base text-stone-300 hover:bg-white hover:text-black">{projectPageTitle(project)}</a>)}</div>
              <a href="#experience" onClick={closeDropdown} className="mobile-menu-link">Experience</a>
              <a href="#about" onClick={closeDropdown} className="mobile-menu-link">About</a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer" onClick={closeDropdown} className="mobile-menu-link">Resume</a>
              <a href="#contact" onClick={closeDropdown} className="mobile-menu-link">Contact</a>
            </nav>
          </div>
        </dialog>, document.body
      )}
    </header>
    </div>
  );
};
export default Navbar;
