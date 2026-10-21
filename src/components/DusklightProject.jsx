import EngineeringHighlights from './EngineeringHighlights';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import dusklightLogo from '../assets/projects/dusklight-logo.webp';
import touchTitle from '../assets/projects/dusklight-story/touch-title.webp';
import controllerBefore from '../assets/projects/dusklight-story/controller-before.webp';
import controllerAfter from '../assets/projects/dusklight-story/controller-after.webp';
import earlyBuild from '../assets/projects/dusklight-story/early-build.webp';
import assignmentWarning from '../assets/projects/dusklight-story/assignment-warning.webp';
import modReference from '../assets/projects/dusklight-story/mod-reference.webp';
import gameReference from '../assets/projects/dusklight-story/game-reference.webp';
import './DusklightProject.css';
import ProjectHeroDetails from './ProjectHeroDetails';

const PROJECT_URL = 'https://twilitrealm.dev';

const STORY_IMAGE_DIMENSIONS = {
  [dusklightLogo]: { width: 2310, height: 495 },
  [touchTitle]: { width: 2868, height: 1320 },
  [controllerBefore]: { width: 1320, height: 581 },
  [controllerAfter]: { width: 2868, height: 1320 },
  [earlyBuild]: { width: 2868, height: 1320 },
  [assignmentWarning]: { width: 2868, height: 1320 },
  [modReference]: { width: 960, height: 540 },
  [gameReference]: { width: 2560, height: 1440 },
};

function StoryImage({ src, alt, caption }) {
  const dimensions = STORY_IMAGE_DIMENSIONS[src];
  return <figure className="dusklight-story-image"><a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt}`}><img src={src} alt={alt} width={dimensions.width} height={dimensions.height} loading="lazy" decoding="async" /></a><figcaption>{caption}</figcaption></figure>;
}

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
        <h3 tabIndex={-1} id={`dusklight-chapter-${number}`}>{title}</h3>
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
          <img src={dusklightLogo} width={2310} height={495} alt="Dusklight" className="dusklight-logo" />
        </div>
        <div className="dusklight-hero-copy">
          <p className="dusklight-eyebrow">Open-source collaboration · iPhone &amp; iPad</p>
          <h1 id="dusklight-title">Become a legend – again.</h1>
          <p className="dusklight-summary">I built GameCube-style multitouch controls for Dusklight’s existing iOS port, letting players move, aim, and press buttons together.<span className="project-hero-description-detail"> Through device testing and open-source review, I adapted the overlay into a shared input system with controller selection, sensitivity settings, and iOS gyro aiming.</span></p>
          <ul className="dusklight-technologies" aria-label="Project technologies">
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="dusklight-actions project-hero-actions">
            <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer" className="dusklight-button">Visit Project <FaExternalLinkAlt aria-hidden="true" /></a>
            {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="dusklight-button project-secondary-action">Watch Demonstration <FaExternalLinkAlt aria-hidden="true" /></a>}
          </div>
          <ProjectHeroDetails storyId="dusklight-story" note="Touch controls · Open-source contribution" rightsHolder="Nintendo" />
        </div>
      </section>

      <section id="dusklight-story" className="dusklight-story" aria-labelledby="dusklight-story-title">
        <div className="dusklight-story-line" aria-hidden="true" />
        <header className="dusklight-story-heading">
          <h2 id="dusklight-story-title" tabIndex={-1}>Development Story</h2>
          <p>The goal was straightforward: play Twilight Princess on an iPhone without a physical controller. Getting there meant making a touch overlay behave like a controller throughout the existing game, settings, and input pipeline.</p>
        </header>

        <EngineeringHighlights slug="dusklight" />

        <div className="dusklight-timeline">
          <StoryChapter number="01" title="Start with the missing way to play">
            <p>Dusklight already provided the foundation: an open-source native port of Twilight Princess with an iOS ARM64 build. My contribution focused on adding touchscreen input to that existing application. The starting controller menu offered None and Keyboard, leaving phone users dependent on an external gamepad.</p>
            <p>I began by following the path from platform input events to the GameCube PAD state consumed by the game. The overlay needed to feed that path while supporting movement, camera control, and button presses at the same time.</p>
            <StoryImage src={controllerBefore} alt="Original controller menu showing None and Keyboard, with no touch-control option." caption="The starting point: no touchscreen device to select in the controller menu." />
          </StoryChapter>

          <StoryChapter number="02" title="Build the GameCube-style overlay">
            <p>I added a translucent overlay with a movement stick, C-stick, D-pad, A/B/X/Y buttons, L/R shoulders, Z, and Start. SDL finger events supplied touch positions, and ImGui drew the controls over gameplay. Layout dimensions scaled with the display to keep the controls usable in landscape.</p>
            <p>Each active finger retained its assigned control until release or cancellation. That allowed one thumb to move while another controlled the camera or pressed a button. Touch state cleared when focus was lost or a menu became visible, and the overlay hid while the settings interface was open.</p>
            <StoryImage src={assignmentWarning} alt="Early gameplay with both touch sticks, face buttons, shoulders, and a no-controller-assigned warning." caption="An early gameplay milestone also exposed the next problem: the overlay existed, but the application still reported that no controller was assigned." />
          </StoryChapter>

          <StoryChapter number="03" title="Make touch a controller choice">
            <p>I added Touch Controls alongside Keyboard in the controller menu, persisted its enabled state, and made selecting another device turn touch input off for that port. iOS first-run defaults enabled touch for port 1 so a new installation had a way to play immediately.</p>
            <p>A separate warning check still considered only physical gamepads and keyboard bindings. Selecting Touch Controls could therefore work while the No Device Assigned message remained on screen. I updated the overlay check to recognize touch as a valid assignment too.</p>
            <p>Testing also uncovered a keyboard-selection crash: removing the generated keyboard bindings file allowed the application to launch again. That was a useful reproduction clue, but it did not by itself establish the underlying crash cause.</p>
            <StoryImage src={controllerAfter} alt="Updated controller menu with Touch Controls selected between None and Keyboard." caption="Touch Controls became an explicit device option. The no-controllers-detected text refers to external hardware; touch does not require a connected gamepad." />
          </StoryChapter>

          <StoryChapter number="04" title="Trace why full tilt still meant walking">
            <p>The hardest input problem was movement strength. Even with the stick pushed fully forward and sensitivity set to 500%, Link barely walked. Increasing sensitivity alone did not resolve the repeated device reports, so I traced how touch displacement became a signed axis value and then passed through the existing PAD clamping stage.</p>
            <p>The implementation gained an adjustable full-tilt radius, a dead zone, and a main-stick run snap. It also applied touch stick values after PAD clamping, using the game-facing ranges of 72 for the main stick and 59 for the C-stick. This addressed the conversion boundary as well as the touch gesture itself.</p>
            <p>The sensitivity field exposed another mobile usability issue: the iOS numeric keyboard could remain open without a Done button. It became a separate regression to track. The development record does not confirm a final keyboard-dismissal fix or a final on-device sign-off for the movement changes.</p>
          </StoryChapter>

          <StoryChapter number="05" title="Add aiming support and investigate texture failures">
            <p>I extended the existing gyro aiming path to read the iPhone's motion sensors through SDL when touch controls were active. The device sensor axes were remapped for display orientation and fed into the existing aiming filters and sensitivity settings, with controller sensors available as a fallback.</p>
            <p>In parallel, custom 4K texture packs crashed or failed to appear on iOS despite working on desktop. That investigation produced a working texture-loading milestone in the test build. The supplied title-screen capture shows the replacement assets and touch overlay together.</p>
            <p>Maintainer feedback changed the scope: decoding BC-compressed textures into RGBA would increase memory use, and mobile-compatible formats such as ASTC were preferred. I removed the custom texture-loading changes from the touch-controls contribution so the input feature could be reviewed independently.</p>
            <StoryImage src={touchTitle} alt="Twilight Princess title screen with a 4K texture-pack logo and the touchscreen controller overlay." caption="A device test milestone with custom textures and touch controls visible together. The 116 FPS overlay is a point-in-time reading, not a sustained performance benchmark. The screen credits the 4K textures to Henriko." />
          </StoryChapter>

          <StoryChapter number="06" title="Respond to review with one shared system">
            <p>The first implementation lived in an iOS-specific module. A maintainer asked for a solution that any device could enable, without maintaining a separate touch-control system for each platform.</p>
            <p>I moved the implementation into the shared dusk::touch_controls module, added it to the common build list, and connected its event handling, drawing, and PAD updates through shared paths. Touch Controls and its sensitivity setting became available across platforms; iOS retained only its default-on policy. The device gyro extension remained iOS-specific.</p>
            <p>I also restored the project's normal version presentation and removed the personal beta branding used during early testing. After syncing the fork with newer upstream work, I reapplied the contribution and resolved conflicts against the updated controller menu and overlay.</p>
            <StoryImage src={earlyBuild} alt="Early Dusklight test menu with personal beta branding and a no-controller-assigned warning." caption="An intermediate test build, preserved here as development history. The personal beta label was removed when preparing the contribution for review." />
          </StoryChapter>

          <StoryChapter number="07" title="Package builds and harden startup">
            <p>The test loop used GitHub Actions to build the iOS ARM64 application. Its downloadable artifact contained Dusklight.app; packaging that bundle inside Payload and zipping it as an IPA made it available for signing and installation on the phone.</p>
            <p>Later testing still reported a startup crash. I reduced early touch-settings access by checking runtime prerequisites before processing touch input and using cached state for the overlay. The loader also stopped marking settings as loaded when the configuration directory was not yet available.</p>
            <p>Those changes passed a macOS build and were pushed as a startup mitigation. Without an iOS crash log or a confirmed device retest afterward, I could not establish that they fixed the reported startup crash. A successful desktop compile was useful integration evidence, but it could not replace that check.</p>
          </StoryChapter>

          <StoryChapter number="08" title="The result and the engineering lesson">
            <p>The project reached a visible, working touchscreen gameplay prototype with a selectable controller mode, persisted sensitivity settings, and an implementation shared across platform builds. The supplied captures document that progress; they do not establish that every later build was stable or that the contribution was merged.</p>
            <p>The main lesson was that input is a system-wide contract. Drawing a joystick was the beginning. Making it usable meant understanding finger ownership, controller assignment, axis conversion, UI focus, settings persistence, build packaging, and the maintenance expectations of an existing open-source project.</p>
            <p>Dusklight and its contributors provided the native game port. My work here focused on touch input, its integration, the iOS gyro extension, and the debugging described above.</p>
            <div className="dusklight-reference-gallery">
              <StoryImage src={gameReference} alt="Twilight Princess reference image of Link riding Epona in front of a waterfall." caption="Supplied game reference image for project context; not a touch-control test capture." />
              <StoryImage src={modReference} alt="Supplied mod reference image showing Linkle and Midna." caption="Supplied mod reference image. Character and visual assets are not my work; this image is not evidence of mobile mod validation." />
            </div>
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
