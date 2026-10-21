import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import reignitionLogo from '../assets/projects/reignition-logo.png';
import Aurora from './Aurora';
import './ReignitionProject.css';

const PORTFOLIO_REPOSITORY = 'https://github.com/aperezro/Alejandro';
const REIGNITION_RELEASE = 'https://github.com/aperezro/project-reignition/releases/tag/ios-v1.0.6-build2';
const GODOT_IOS_EXPORT_GUIDE = 'https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_ios.html';
const XCODE_SIGNING_GUIDE = 'https://developer.apple.com/documentation/xcode/configuring-app-signing';

const DEBUGGING_ISSUES = [
  {
    title: 'Misplaced Sonic pupils and eye textures',
    seen: 'Sonic’s pupils or eye textures appeared out of position in the iOS build.',
    mattered: 'A visible character-art issue made the mobile build feel unfinished, even when the rest of the scene rendered.',
    investigated: 'I compared the character in the device build and iterated on the rendering until the eye alignment matched the intended presentation. The exact underlying technical cause is not recorded in this portfolio.',
    verified: 'The project summary records the eye-alignment issue as fixed. It does not identify a specific code-level cause.'
  },
  {
    title: 'The jump ball kept spinning',
    seen: 'Sonic’s jump-ball/spinning animation could remain active continuously instead of appearing only during the jump.',
    mattered: 'An animation that never returned to its normal state obscured the character and made ordinary movement look like a broken gameplay state.',
    investigated: 'An earlier attempted fix did not fully solve it, so I continued iterating and retesting instead of treating the first change as complete. The implementation-level cause is not documented here.',
    verified: 'The project summary records the spinning jump effect as fixed after further iteration; it does not specify the final code change.'
  },
  {
    title: 'A gray screen after launching an installed build',
    seen: 'After installing a build, launching the app could leave the screen gray.',
    mattered: 'Successful signing and installation did not prove the game had launched correctly; launch and gameplay needed separate checks.',
    investigated: 'I treated the gray launch as a runtime symptom and checked the installed build on-device. The available project notes do not document a root cause or tie this symptom to a particular change.',
    verified: 'Installed builds were checked for launch and gameplay on actual devices. No specific gray-screen fix is claimed here because its resolution is not documented.'
  },
  {
    title: 'Sand Oasis Rampage stalled while loading',
    seen: 'The Sand Oasis “Rampage — defeat 20 enemies” mission could get stuck loading.',
    mattered: 'A loading stall prevented the player from reaching the objective, so a successful app launch alone was not enough validation.',
    investigated: 'I reproduced the mission-specific stall and worked through the native scene-loading path. The project notes do not document the underlying code-level cause.',
    verified: 'The project summary records resolution of an iOS native scene-loading issue that could stall Rampage missions, and says recovery options were added.'
  },
  {
    title: 'The menu shifted and the rewards button disappeared',
    seen: 'The main menu could sit off-center, and the level-rewards screen could lose its confirmation button.',
    mattered: 'Misplaced menus and an unreachable confirmation action can block navigation and stop a level from being completed.',
    investigated: 'I checked the full-screen layouts on iPhone and iPad and iterated on the affected menu and results screens. The portfolio notes do not establish a single technical cause.',
    verified: 'The project summary records menu positioning and reward-screen button issues as fixed, with device-specific full-screen and safe-area adaptations.'
  }
];

function StoryChapter({ number, title, children, className = '' }) {
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
      className={`reignition-chapter${revealed ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      aria-labelledby={`reignition-chapter-${number}`}
    >
      <span className="reignition-chapter-number" aria-hidden="true">{number}</span>
      <div className="reignition-chapter-body">
        <h3 id={`reignition-chapter-${number}`}>{title}</h3>
        {children}
      </div>
    </section>
  );
}

function DebuggingCard({ issue, index }) {
  return (
    <details className="reignition-debug-card">
      <summary>
        <span className="reignition-debug-index">{String(index + 1).padStart(2, '0')}</span>
        <span>{issue.title}</span>
        <span className="reignition-debug-toggle" aria-hidden="true" />
      </summary>
      <dl>
        <div><dt>What I saw</dt><dd>{issue.seen}</dd></div>
        <div><dt>Why it mattered</dt><dd>{issue.mattered}</dd></div>
        <div><dt>How I investigated it</dt><dd>{issue.investigated}</dd></div>
        <div><dt>What was verified</dt><dd>{issue.verified}</dd></div>
      </dl>
    </details>
  );
}

export default function ReignitionProject({ project }) {
  return (
    <article className="reignition-project">
      <section className="reignition-hero" aria-labelledby="reignition-title">
        <div className="reignition-logo-column">
          <img src={reignitionLogo} alt="Project Reignition" className="reignition-logo" />
        </div>
        <div className="reignition-hero-copy">
          <p className="reignition-eyebrow">Project / iPhone &amp; iPad port</p>
          <h1 id="reignition-title">A classic adventure, <span>reborn for mobile.</span></h1>
          <p className="reignition-summary">I brought Project Reignition, a Godot 4.7 .NET game, to iPhone and iPad. The port adds touch controls and mobile-first layouts, with gameplay and interface fixes validated on real Apple devices.</p>
          <ul className="reignition-technologies" aria-label="Project technologies">
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="reignition-actions">
            <a href={REIGNITION_RELEASE} target="_blank" rel="noopener noreferrer" className="reignition-button">Download Now <IoGameController aria-hidden="true" /></a>
            {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="reignition-button">Watch Gameplay <FaExternalLinkAlt aria-hidden="true" /></a>}
            <a href="#reignition-story" className="reignition-story-link">Explore the development story</a>
          </div>
        </div>
      </section>

      <section id="reignition-story" className="reignition-story" aria-labelledby="reignition-story-title">
        <div className="reignition-story-line" aria-hidden="true" />
        <header className="reignition-story-heading">
          <h2 id="reignition-story-title">Development Story</h2>
          <p className="reignition-story-intro">The goal sounded straightforward: take Project Reignition and make it playable on my phone. Getting there meant adapting controls, rebuilding layouts, working through Apple’s signing process, and repeatedly testing what happened once the game left the desktop.</p>
        </header>

        <div className="reignition-timeline">
          <StoryChapter number="01" title="Starting with an existing game">
            <p>This was a port of an existing Godot .NET/C# project, not a game built from scratch for mobile. The first work was understanding how the project was put together, preparing an iOS build process, and finding desktop assumptions that did not carry over to a touch device.</p>
            <p>That meant treating the desktop version as a starting point, then checking the things a phone changes: how a player gives input, how much screen space the game has, and how the app gets installed and launched on iOS.</p>
          </StoryChapter>

          <StoryChapter number="02" title="Making the game playable with touch">
            <p>I added on-screen movement and action controls and connected them to the game’s existing gameplay inputs, so touch could drive the same actions the game already understood.</p>
            <p>Controls were only one part of playability. Menus also had to be reachable on a phone, and a level needed to end on a results screen where the player could confirm and continue.</p>
          </StoryChapter>

          <StoryChapter number="03" title="Adapting the interface to two screen sizes">
            <p>I adapted the presentation for full-screen play on both iPhone and iPad. The two devices have different screen shapes and usable areas, so a layout that looked centered on one could feel shifted on the other.</p>
            <p>On iPhone, the main menu appeared off-center, and the level-rewards screen could hide its confirmation button. Those were not cosmetic details: essential controls had to stay visible and reachable across both screen shapes.</p>
          </StoryChapter>

          <StoryChapter number="04" title="The bugs that appeared on real devices" className="reignition-debugging-chapter">
            <p className="reignition-chapter-lead">Each issue below is described from its observed symptom and the project notes. Where a root cause or exact code change was not documented, I have left it explicitly unclaimed.</p>
            <div className="reignition-debug-list">
              {DEBUGGING_ISSUES.map((issue, index) => <DebuggingCard key={issue.title} issue={issue} index={index} />)}
            </div>
          </StoryChapter>

          <StoryChapter number="05" title="Getting builds onto Apple devices">
            <p>I generated an IPA, then worked through the parts of Apple’s signing path that make an installable build more than an exported file: Xcode signing, provisioning, account setup, trusting the developer on the device, and keeping the device unlocked during installation.</p>
            <p>Sideloadly and AltStore caused issues during this process, so I moved to the Xcode/iOS signing workflow. An app showing as installed was not a pass by itself; I still had to open it and check that gameplay started.</p>
            <p>I tested on my iPhone 17, registered as <strong>Alejandro17</strong>, and an iPad. I also checked that each device actually had the newest build before treating a test result as current.</p>
            <p className="reignition-doc-links">References: <a href={GODOT_IOS_EXPORT_GUIDE} target="_blank" rel="noopener noreferrer">Godot’s iOS export guide</a> and <a href={XCODE_SIGNING_GUIDE} target="_blank" rel="noopener noreferrer">Apple’s Xcode code-signing guide</a>.</p>
          </StoryChapter>

          <StoryChapter number="06" title="Building a repeatable workflow">
            <p>The useful loop was concrete: reproduce a problem, make one focused change, build and export, install on hardware, test the affected flow, and repeat. After a fix, I retested the related input, screen, mission, or launch path instead of assuming a successful build meant the issue was gone.</p>
            <p>I used targeted device checks for app launch, touch movement and actions, menus and level results, mission loading, and the affected fixes on both iPhone and iPad. These are manual hardware checks, not a claim of an automated regression suite.</p>
            <p>The build/export scripts and the game’s test suite are not included in this portfolio repository, so I am not attributing specific script names or automated checks to them here. The repository linked below contains this portfolio and case-study page.</p>
          </StoryChapter>

          <StoryChapter number="07" title="Outcome and lessons learned" className="reignition-outcome">
            <p>The result is an iOS port with touch controls and mobile interface adaptations, developed through repeated installation and gameplay testing on iPhone and iPad. That process taught me to account for platform differences early, connect new input to existing gameplay, test layouts on real screen shapes, and treat signing and installation as part of the engineering work.</p>
            <p>Most importantly, testing on actual hardware exposed problems that a successful desktop run—or an IPA that merely installed—could not answer.</p>

            <figure className="reignition-gameplay">
              <figcaption>Gameplay footage is linked from the project listing. Its recording device and build version were not specified, so this clip is not presented as a device-specific benchmark.</figcaption>
              {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="reignition-gameplay-link">Open gameplay footage <FaExternalLinkAlt aria-hidden="true" /></a>}
            </figure>

            <div className="reignition-contribution">
              <h4>My contribution</h4>
              <ul>
                {['iOS integration', 'Touch controls', 'Responsive game UI', 'Debugging', 'Build packaging', 'Device testing'].map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="reignition-built-with">
              <h4>Built with</h4>
              <ul aria-label="Verified tools and technologies">
                {['Godot', 'C#', '.NET', 'Xcode'].map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <p className="reignition-source-note">The public source link is for this portfolio and case study; a separate game-source repository is not linked in the project materials.</p>
            <nav className="reignition-final-links" aria-label="Project links">
              {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="reignition-button">Watch Gameplay <FaExternalLinkAlt aria-hidden="true" /></a>}
              <a href={PORTFOLIO_REPOSITORY} target="_blank" rel="noopener noreferrer" className="reignition-source-link">View Source <FaExternalLinkAlt aria-hidden="true" /></a>
            </nav>
          </StoryChapter>
        </div>
      </section>

      <div className="reignition-fire-aurora" aria-hidden="true">
        <Aurora colorStops={['#ffdb57', '#ff641f', '#c51c19']} blend={0.46} amplitude={1.15} speed={0.7} />
      </div>
    </article>
  );
}
