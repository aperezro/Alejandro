import { motion, useReducedMotion } from 'framer-motion';
import { IoGameController } from 'react-icons/io5';
import unleashedLogo from '../assets/projects/unleashed-recompiled-logo.png';
import UnleashedStory from './UnleashedStory';
import './UnleashedProject.css';

const RELEASE_URL = 'https://github.com/aperezro/UnleashedRecomp/releases/tag/ios-native-metal-v1.0.3';

export default function FeaturedProject() {
  const reducedMotion = useReducedMotion();

  return (
    <article id="sonic-ios" className="unleashed-project">
      <section className="unleashed-intro" aria-labelledby="unleashed-title">
        <motion.div
          className="unleashed-logo-column"
          initial={reducedMotion ? false : { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <img src={unleashedLogo} alt="Unleashed Recompiled" width="2554" height="1302" className="unleashed-project-logo" />
          <p className="unleashed-logo-caption">A new home for a familiar adventure.</p>
        </motion.div>
        <motion.div
          className="unleashed-description"
          initial={reducedMotion ? false : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <p className="unleashed-eyebrow">Independent engineering · Native iOS port</p>
          <h1 id="unleashed-title">Sonic Unleashed.<br /><span>Now on iPhone &amp; iPad.</span></h1>
          <div className="unleashed-rule" />
          <p>I ported the community-developed Unleashed Recompiled project to iPhone and iPad as a native ARM64 application, bringing Sonic Unleashed to Apple’s mobile hardware.</p>
          <p>My work includes a native Metal renderer, SPIR-V to Metal shader translation, responsive touchscreen controls, and platform fixes for memory mapping, graphics initialization, and the iOS application lifecycle. Gameplay, audio, and rendering were validated on real iPhone and iPad hardware.</p>
          <ul className="unleashed-technologies" aria-label="Project technologies">
            {['C++', 'ARM64', 'Metal', 'iOS / iPadOS'].map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="unleashed-actions">
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="unleashed-download hero-action max-w-full rounded-full bg-white text-lg text-stone-800 shadow-sm transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Download Now <IoGameController aria-hidden="true" />
            </a>
          </div>
          <p className="unleashed-release-note">Native Metal preview v1.0.3 · Installation guide on GitHub</p>
        </motion.div>
      </section>
      <section id="development-story" className="unleashed-story" aria-labelledby="development-story-title">
        <div className="unleashed-story-line" aria-hidden="true" />
        <h2 id="development-story-title">Development Story</h2>
        <UnleashedStory releaseUrl={RELEASE_URL} />
      </section>
    </article>
  );
}
