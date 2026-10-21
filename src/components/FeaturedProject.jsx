import { motion as Motion, useReducedMotion } from 'framer-motion';
import { IoGameController, IoHammerSharp } from 'react-icons/io5';
import unleashedLogo from '../assets/projects/unleashed-recompiled-logo.png';
import ProjectHeroDetails from './ProjectHeroDetails';
import UnleashedStory from './UnleashedStory';
import './UnleashedProject.css';

const RELEASE_URL = 'https://github.com/aperezro/UnleashedRecomp/releases/tag/ios-native-metal-v1.0.3';

export default function FeaturedProject() {
  const reducedMotion = useReducedMotion();

  return (
    <article id="sonic-ios" className="unleashed-project">
      <section className="unleashed-intro" aria-labelledby="unleashed-title">
        <Motion.div
          className="unleashed-logo-column"
          initial={reducedMotion ? false : { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <img src={unleashedLogo} alt="Unleashed Recompiled" width="2554" height="1302" className="unleashed-project-logo" />
        </Motion.div>
        <Motion.div
          className="unleashed-description"
          initial={reducedMotion ? false : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <p className="unleashed-eyebrow">Independent engineering · Native iOS port</p>
          <h1 id="unleashed-title">Sonic Unleashed.<br /><span>Now on iPhone &amp; iPad.</span></h1>
          <div className="unleashed-rule" />
          <p>I brought the community-developed Unleashed Recompiled project to iPhone and iPad as a native ARM64 app.<span className="project-hero-description-detail"> My work includes a Metal renderer, responsive touchscreen controls, and fixes for installation, rendering, and background-resume behavior, tested on real Apple devices.</span></p>
          <ul className="unleashed-technologies" aria-label="Project technologies">
            {['C++', 'ARM64', 'Metal', 'iOS / iPadOS'].map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="unleashed-actions project-hero-actions">
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="unleashed-download hero-action max-w-full rounded-full bg-white text-lg text-stone-800 shadow-sm transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Download Now <IoGameController aria-hidden="true" />
            </a>
            <a href="https://lnkd.in/p/gE7V83xj" target="_blank" rel="noopener noreferrer" className="project-secondary-action hero-action rounded-full text-lg">View Gameplay <IoHammerSharp aria-hidden="true" /></a>
          </div>
          <ProjectHeroDetails storyId="development-story" note="Native Metal preview · v1.0.3" rightsHolder="SEGA" />
        </Motion.div>
      </section>
      <section id="development-story" className="unleashed-story" aria-labelledby="development-story-title">
        <div className="unleashed-story-line" aria-hidden="true" />
        <h2 id="development-story-title" tabIndex={-1}>Development Story</h2>
        <UnleashedStory releaseUrl={RELEASE_URL} />
      </section>
    </article>
  );
}
