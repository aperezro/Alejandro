import { motion } from 'framer-motion';
import { IoGameController } from 'react-icons/io5';
import unleashedLogo from '../assets/projects/unleashed-recompiled-logo.png';
import UnleashedStory from './UnleashedStory';
import './UnleashedProject.css';

const RELEASE_URL = 'https://github.com/aperezro/UnleashedRecomp/releases/tag/ios-native-metal-v1.0.3';

export default function FeaturedProject() {
  return (
    <article id="sonic-ios" className="unleashed-project">
      <section className="unleashed-intro" aria-labelledby="unleashed-title">
        <div className="unleashed-logo-column">
          <img src={unleashedLogo} alt="Unleashed Recompiled" width="2554" height="1302" className="unleashed-project-logo" />
          <p className="unleashed-logo-caption">A new home for a familiar adventure.</p>
        </div>
        <div className="unleashed-description">
          <p className="unleashed-eyebrow">Independent engineering · Native iOS port</p>
          <h1 id="unleashed-title">Sonic Unleashed.<br /><span>Now on iPhone &amp; iPad.</span></h1>
          <div className="unleashed-rule" />
          <p>I ported the community-developed Unleashed Recompiled project to iPhone and iPad as a native ARM64 application, bringing Sonic Unleashed to Apple’s mobile hardware.</p>
          <p>My work includes a native Metal renderer, SPIR-V to Metal shader translation, responsive touchscreen controls, and platform fixes for memory mapping, graphics initialization, and the iOS application lifecycle. Gameplay, audio, and rendering were validated on real iPhone and iPad hardware.</p>
          <ul className="unleashed-technologies" aria-label="Project technologies">
            {['C++', 'ARM64', 'Metal', 'iOS / iPadOS'].map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="unleashed-actions">
            <motion.a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Now"
              className="unleashed-download hero-action relative max-w-full overflow-hidden rounded-full bg-white text-lg text-stone-800 shadow-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] focus-visible:scale-105"
              whileHover="hover"
              whileFocus="hover"
              initial="initial"
            >
              <motion.span className="inline-flex items-center gap-2" variants={{ initial: { y: 0, opacity: 1 }, hover: { y: -20, opacity: 0 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>Download Now <IoGameController aria-hidden="true" /></motion.span>
              <motion.span aria-hidden="true" className="absolute inset-0 flex items-center justify-center gap-2" variants={{ initial: { y: 20, opacity: 0 }, hover: { y: 0, opacity: 1 } }} transition={{ duration: 0.3, ease: 'easeInOut' }}>Download Now <IoGameController /></motion.span>
            </motion.a>
          </div>
          <p className="unleashed-release-note">Native Metal preview v1.0.3 · Installation guide on GitHub</p>
        </div>
      </section>
      <section id="development-story" className="unleashed-story" aria-labelledby="development-story-title">
        <div className="unleashed-story-line" aria-hidden="true" />
        <h2 id="development-story-title">Development Story</h2>
        <UnleashedStory releaseUrl={RELEASE_URL} />
      </section>
    </article>
  );
}
