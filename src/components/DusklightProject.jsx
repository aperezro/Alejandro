import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import dusklightLogo from '../assets/projects/dusklight-logo.webp';
import './DusklightProject.css';

const PROJECT_URL = 'https://twilitrealm.dev';

function StoryChapter({ number, title, children }) {
  const reducedMotion = useReducedMotion();
  const chapterRef = useRef(null);
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    const chapter = chapterRef.current;
    if (!chapter) return;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRevealed(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(chapter);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={chapterRef}
      className={`dusklight-chapter${revealed ? ' is-visible' : ''}`}
      aria-labelledby={`dusklight-chapter-${number}`}
    >
      <span className="dusklight-chapter-number" aria-hidden="true">{number}</span>
      <div className="dusklight-chapter-body">
        <h3 id={`dusklight-chapter-${number}`}>{title}</h3>
        {children}
      </div>
    </section>
  );
}

export default function DusklightProject({ project }) {
  return (
    <article className="dusklight-project">
      <section className="dusklight-hero" aria-labelledby="dusklight-title">
        <div className="dusklight-logo-column">
          <img src={dusklightLogo} alt="Dusklight" className="dusklight-logo" />
        </div>
        <div className="dusklight-hero-copy">
          <p className="dusklight-eyebrow">Open-source collaboration · iPhone &amp; iPad</p>
          <h1 id="dusklight-title">Become a legend – again.</h1>
          <p className="dusklight-summary">I contributed to bringing this GameCube-era adventure to Apple mobile devices, working across native deployment, touch controls, high-resolution textures, and platform-specific rendering and stability issues.</p>
          <ul className="dusklight-technologies" aria-label="Project technologies">
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="dusklight-actions">
            {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="dusklight-button">Watch Demonstration <FaExternalLinkAlt aria-hidden="true" /></a>}
            <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer" className="dusklight-button dusklight-button-secondary">Visit Project <FaExternalLinkAlt aria-hidden="true" /></a>
          </div>
          <a className="dusklight-story-link" href="#dusklight-story">Explore the development story</a>
        </div>
      </section>

      <section id="dusklight-story" className="dusklight-story" aria-labelledby="dusklight-story-title">
        <div className="dusklight-story-line" aria-hidden="true" />
        <header className="dusklight-story-heading">
          <h2 id="dusklight-story-title">Development Story</h2>
          <p>Bringing a console-era game to iPhone and iPad meant working across more than a build target. The port touched input, interface, asset scale, platform behavior, and the realities of testing performance on mobile hardware.</p>
        </header>

        <div className="dusklight-timeline">
          <StoryChapter number="01" title="Taking a console-era game to mobile">
            <p>I contributed to an open-source project bringing a GameCube-era title to modern platforms, including native deployment on iPhone and iPad. The work included improving iOS/iPadOS deployment and ARM64 builds.</p>
            <p>Moving to Apple mobile hardware meant checking platform-specific assumptions alongside the build itself, then validating the resulting app on devices rather than stopping at a successful compile.</p>
          </StoryChapter>

          <StoryChapter number="02" title="Adapting play for touch">
            <p>I implemented touchscreen controls and mobile UI overlays so players could interact with the game on a touch-first device.</p>
            <p>The controls and overlays needed to coexist with gameplay while keeping the game readable and usable on a smaller screen.</p>
          </StoryChapter>

          <StoryChapter number="03" title="Bringing high-resolution textures to mobile">
            <p>I added support for high-resolution 4K textures on mobile, extending the visual assets available to the iPhone and iPad build.</p>
            <p>That work also made texture handling and memory behavior important parts of the mobile validation process.</p>
          </StoryChapter>

          <StoryChapter number="04" title="Investigating platform-specific failures">
            <p>I debugged platform-specific crashes and rendering issues, investigating texture handling, memory behavior, build artifacts, signing, and Apple-specific graphics quirks.</p>
            <p>These symptoms crossed boundaries between the game, the build, and the device platform, so I tested hypotheses against device behavior instead of assuming every failure came from one layer.</p>
          </StoryChapter>

          <StoryChapter number="05" title="Validating performance on hardware">
            <p>I validated performance and stability across mobile hardware at high refresh rates, checking the experience on actual devices.</p>
            <p>The work combined deployment, input, visuals, and runtime investigation into an ongoing process of making the game behave well outside its original console environment.</p>
            <div className="dusklight-project-links">
              {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer">Watch Demonstration <FaExternalLinkAlt aria-hidden="true" /></a>}
              <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">Visit twilitrealm.dev <FaExternalLinkAlt aria-hidden="true" /></a>
            </div>
          </StoryChapter>
        </div>
      </section>
    </article>
  );
}
