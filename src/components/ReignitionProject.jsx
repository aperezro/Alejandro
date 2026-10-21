import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import reignitionLogo from '../assets/projects/reignition-logo.png';
import Aurora from './Aurora';
import pupilReproduction from '../assets/projects/reignition-story/pupil-offset-reproduction.png';
import spinReproduction from '../assets/projects/reignition-story/spin-effect-reproduction.png';
import spinGlitchGameplay from '../assets/projects/reignition-story/spin-glitch-gameplay.jpg';
import ipadHandsOn from '../assets/projects/reignition-story/ipad-hands-on.jpg';
import touchGameplay from '../assets/projects/reignition-story/touch-gameplay.jpeg';
import grinding from '../assets/projects/reignition-story/grinding.jpeg';
import moonlitStage from '../assets/projects/reignition-story/moonlit-stage.jpeg';
import actionScene from '../assets/projects/reignition-story/action.jpeg';
import './ReignitionProject.css';
import ProjectHeroDetails from './ProjectHeroDetails';

const GAME_REPOSITORY = 'https://github.com/aperezro/project-reignition';
const IOS_NOTES = `${GAME_REPOSITORY}/blob/c61e5d6bfa24dbdaa5d53c9fb4b695cefc597560/IOS.md`;
const IOS_TESTS = `${GAME_REPOSITORY}/tree/c61e5d6bfa24dbdaa5d53c9fb4b695cefc597560/Project/tests/ios`;
const REIGNITION_RELEASE = 'https://github.com/aperezro/project-reignition/releases/tag/ios-v1.0.6-build2';
const GODOT_IOS_EXPORT_GUIDE = 'https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_ios.html';
const XCODE_SIGNING_GUIDE = 'https://developer.apple.com/documentation/xcode/configuring-app-signing';

const DEBUGGING_ISSUES = [
  {
    title: 'Sonic’s pupils lost their alignment',
    seen: 'The character rendered, but his pupils sat in the wrong places. It was a small detail with a very visible result.',
    mattered: 'Exporting the same scene did not guarantee that its shader settings survived the trip to a device build.',
    investigated: 'The headless export path could omit per-instance shader parameters. I moved the pupil UV offsets into ordinary exported properties and applied them again at runtime through SonicEye.gd: +0.225 for the left eye and −0.225 for the right.',
    verified: 'A targeted export check confirmed that both offsets and the runtime script remained in the exported Sonic scene.',
    image: pupilReproduction,
    alt: 'Reproduced missing pupil offsets on Sonic’s model, with the pupils spread farther apart than intended.',
    caption: 'Bug reproduction: zeroed pupil UV offsets, rendered from the actual game model on a Mac. This is a reconstruction, not an original iPhone capture.'
  },
  {
    title: 'The spinning jump effect would not disappear',
    seen: 'The blue jump-ball effect remained visible around Sonic outside a jump. An earlier attempted fix did not fully solve it.',
    mattered: 'The effect made normal movement look like a permanent jump. I needed to check the rendered effect as well as the player’s animation state.',
    investigated: 'The old effect faded through a mesh-transparency property unsupported by the Mobile renderer. I replaced that path with a shader alpha parameter and explicit show/hide control. Fade cancellation also needed to prevent an old tween from hiding a newly started effect or making a cancelled effect return.',
    verified: 'Rendered tests checked the effect before jumping, during an equipped Spin Jump, after landing, and when fades were interrupted or cancelled. The 49-check gameplay suite also passed on the physical M1 iPad.',
    image: spinGlitchGameplay,
    alt: 'In-game capture of Sonic on the ground with the blue spin effect still visible, surrounded by the mobile touch controls.',
    caption: 'Original in-game bug capture: the spin effect remains visible around Sonic on the ground.',
    recreation: {
      src: spinReproduction,
      alt: 'Labeled recreation of the jump-ball glitch using the actual Sonic model, with the spin effect visible while standing.',
      caption: 'Controlled recreation: the actual game model and spin effect rendered on a Mac, with the effect forced visible outside a jump. This illustrates the visual state separately from the original gameplay capture.'
    }
  },
  {
    title: 'Installed successfully. Opened to gray.',
    seen: 'One installed build opened to a gray screen instead of playable gameplay.',
    mattered: 'Signing, installation, launch, and gameplay were four separate milestones. Passing one did not establish the next.',
    investigated: 'I separated deployment checks from runtime checks and used launch logs, screenshots, and device gameplay tests to establish what actually ran. The surviving records do not isolate a specific root cause for this gray-screen report.',
    verified: 'Later device records show normal launch and gameplay. I can substantiate that outcome without attributing this particular symptom to an unrecorded fix.'
  },
  {
    title: 'Sand Oasis Rampage loaded forever—or crashed',
    seen: '“Rampage — defeat 20 enemies” could remain on the loading screen. A native baseline also crashed during scene instantiation.',
    mattered: 'The tutorial could work while another mission failed. A smoke test at startup was not enough to establish that this stage could load.',
    investigated: 'I compared scene bytes and dependencies across exports; the serialized scene was valid and instantiated on desktop. Investigation of the C# binding and native call path pointed to a lifetime gap: native code used a borrowed scene pointer while NativeAOT could collect its managed wrapper. GC.KeepAlive(scene), placed after ChangeSceneToPacked, retained the wrapper until instantiation finished. This diagnosis is supported by the native before/after results; the exact finalizer event was not instrumented.',
    verified: 'The physical iPhone passed 20 cold-load checks, 20 checks with startup preloading, and 23 failure-recovery checks. Normal gameplay subsequently showed 4/20 enemies defeated. Failed loads now expose Retry and Main menu instead of an endless spinner.',
    code: 'changeError = GetTree().ChangeSceneToPacked(scene);\nGC.KeepAlive(scene);'
  },
  {
    title: 'An off-center menu and a missing Confirm button',
    seen: 'The main menu drifted to one side, and Confirm disappeared when post-level rewards appeared.',
    mattered: 'A player could finish a level and still be blocked from continuing. Screen coverage and input context both needed attention.',
    investigated: 'I centered authored menus within the safe area while extending decorative layers to the display edges. Rewards needed to keep menu controls available even when a completed story event was still loaded behind them.',
    verified: 'Layout tests checked 35 assertions across phone and tablet proportions. The real post-level flow passed 111 checks covering results, EXP, the story event, all 11 queued reward prompts, and the return to the menu.'
  }
];

function StoryImage({ src, alt, caption, className = '' }) {
  return (
    <figure className={`reignition-story-image ${className}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${alt}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

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
    <details className="reignition-debug-card" open={index < 2}>
      <summary>
        <span className="reignition-debug-index">{String(index + 1).padStart(2, '0')}</span>
        <span>{issue.title}</span>
        <span className="reignition-debug-toggle" aria-hidden="true" />
      </summary>
      {issue.image && <StoryImage src={issue.image} alt={issue.alt} caption={issue.caption} className="reignition-bug-image" />}
      {issue.recreation && <StoryImage src={issue.recreation.src} alt={issue.recreation.alt} caption={issue.recreation.caption} className="reignition-bug-image" />}
      <dl>
        <div><dt>What I saw</dt><dd>{issue.seen}</dd></div>
        <div><dt>Why it mattered</dt><dd>{issue.mattered}</dd></div>
        <div><dt>How I investigated it</dt><dd>{issue.investigated}</dd></div>
        <div><dt>What was verified</dt><dd>{issue.verified}</dd></div>
        {issue.code && <div><dt>The lifetime fix</dt><dd><pre className="reignition-code"><code>{issue.code}</code></pre></dd></div>}
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
          <p className="reignition-summary">I brought Project Reignition, a Godot .NET game, to iPhone and iPad with multitouch controls and layouts adapted for both displays.<span className="project-hero-description-detail"> The port also addresses rendering glitches, mission loading, and menu flows, with gameplay and interface fixes tested on real Apple devices.</span></p>
          <ul className="reignition-technologies" aria-label="Project technologies">
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="reignition-actions project-hero-actions">
            <a href={REIGNITION_RELEASE} target="_blank" rel="noopener noreferrer" className="reignition-button">Download Now <IoGameController aria-hidden="true" /></a>
            <a href={GAME_REPOSITORY} target="_blank" rel="noopener noreferrer" className="reignition-button project-secondary-action">Visit Project <FaExternalLinkAlt aria-hidden="true" /></a>
          </div>
          <ProjectHeroDetails storyId="reignition-story" note="iOS preview · v1.0.6" />
        </div>
      </section>

      <section id="reignition-story" className="reignition-story" aria-labelledby="reignition-story-title">
        <div className="reignition-story-line" aria-hidden="true" />
        <header className="reignition-story-heading">
          <h2 id="reignition-story-title" tabIndex={-1}>Development Story</h2>
          <p className="reignition-story-intro">The goal sounded straightforward: take Project Reignition and make it playable on my phone. Getting there meant adapting controls, rebuilding layouts, working through Apple’s signing process, and repeatedly testing what happened once the game left the desktop.</p>
        </header>

        <div className="reignition-timeline">
          <StoryChapter number="01" title="Understand the game before changing the platform">
            <p>Project Reignition is an existing fan remake of Sonic and the Secret Rings. The original developers built the game, its levels, and its assets. My project was to bring that desktop Godot .NET/C# game to iPhone and iPad while preserving the adventure they had created.</p>
            <p>I started by tracing the input actions, player states, menus, loading transitions, saves, and resource pipeline. A phone changed more than the control scheme: the project needed an ARM64 build, mobile rendering, writable save locations, usable screen layouts, and a way to sign and install the app.</p>
            <p>I used Codex as an AI coding collaborator while I directed the port, reported what happened on my devices, and tested successive builds. The process was iterative: a reported symptom became a focused investigation, then a change and a repeatable check.</p>
            <StoryImage src={grinding} alt="Sonic grinding along a rail above water in Project Reignition." caption="The original game’s world and character work were the starting point. Supplied game image; its capture platform and build are not established." />
          </StoryChapter>

          <StoryChapter number="02" title="Build a native iOS path, not just an export">
            <p>I prepared a local Godot 4.7 .NET toolchain, matching iOS export templates, and .NET 10.0.401. The C# gameplay code had to compile ahead of time into a native framework for iPhoneOS; exporting a resource pack alone would not produce a playable .NET game.</p>
            <p>The downloaded Godot editor’s CLI resolver preferred a system SDK over the local one, so the bootstrap adjusted that downloaded editor to select the project’s SDK. The export script also checked for managed-code failures because Godot could finish a native export even when its .NET export step had failed.</p>
            <p>The game’s video pipeline needed a mobile-compatible route too. I recovered and converted all 48 videos to Theora for Godot’s built-in playback and checked that they were present in the final pack. The device build uses Godot’s Metal Mobile renderer and iOS-safe saves.</p>
            <p>Simulator testing was another branch of the work: the official .NET simulator library contained x86_64 code despite advertising an ARM64 slice. I checked the actual architectures and used a simulator-only Compatibility-rendering override. Its software-rendering behavior could not stand in for real Metal device testing.</p>
          </StoryChapter>

          <StoryChapter number="03" title="Make touch work through the whole game">
            <p>I built a persistent multitouch overlay around the game’s existing input actions: left-stick movement, a separate camera-drag region, and individual gameplay buttons. One finger could keep moving while another jumped, attacked, or triggered an equipped skill.</p>
            <p>Each finger retained its assigned control until release. Inputs also needed to clear when the app lost focus, suspended, changed context, or resized, so a held touch could not leave Sonic moving after a transition. Touch input suppressed saved mouse and gyro behavior without rewriting the player’s bindings.</p>
            <p>The overlay changes with the game: Confirm, Back, and Start in menus; pause and skip controls; gameplay actions during a level; and Confirm through results, EXP, and unlocks. A quick title-screen tap exposed another timing issue: a press and release between updates could be missed by a held-button check, so I added a regression for that interaction.</p>
            <StoryImage src={touchGameplay} alt="Project Reignition tutorial gameplay with a movement stick, camera-drag area, and individual touch action buttons." caption="Supplied gameplay capture showing the touch overlay in a real level. The tutorial still displays a desktop F-key prompt here—this image illustrates the adaptation process rather than a claim that every instruction was rewritten." />
          </StoryChapter>

          <StoryChapter number="04" title="Fit the phone, then fit the tablet">
            <p>The wide iPhone and taller iPad exposed different layout assumptions. I made the game cover each display without stretching, transformed notch and home-indicator safe areas into viewport coordinates, and kept menus centered inside those bounds.</p>
            <p>Decorative backgrounds extend to the screen edges. On iPad, the camera expands vertically to preserve the horizontal view rather than cropping it. I checked actual menus and gameplay at both aspect ratios; the shifted menu and missing reward confirmation became explicit regression cases.</p>
          </StoryChapter>

          <StoryChapter number="05" title="Follow the bugs past the first attempted fix" className="reignition-debugging-chapter">
            <p className="reignition-chapter-lead">A desktop run, a clean build, and an installed app each answered a different question. These are the failures that pushed the port from “it exports” toward playable device builds.</p>
            <p>The eye-alignment image is a labeled model reproduction. For the spinning-ball glitch, an original gameplay capture shows the problem in context, followed by a controlled recreation that makes the unwanted effect easier to inspect.</p>
            <div className="reignition-debug-list">
              {DEBUGGING_ISSUES.map((issue, index) => <DebuggingCard key={issue.title} issue={issue} index={index} />)}
            </div>
          </StoryChapter>

          <StoryChapter number="06" title="Sign, install, launch—and check the version">
            <p>Sideloadly and AltStore caused installation issues, so I used Xcode and iOS App Signer. An Apple-account refresh resolved Xcode’s failure to retrieve development teams; a free account appeared as a Personal Team. Xcode generated the development certificate and device profile, then iOS App Signer signed the IPA and its frameworks for installation.</p>
            <p>Device pairing, an unlocked screen, developer trust, and a current provisioning profile were part of getting it running. When an installed app opened to gray, it reinforced why deployment and gameplay required separate checks.</p>
            <p>I tested on my iPhone 17 Pro Max, named <strong>Alejandro17</strong>, and a 12.9-inch M1 iPad Pro. At one point the phone still had an older IPA. I checked the installed version and build on each device before judging whether a fix worked.</p>
            <p>The final Rampage update—<strong>version 1.0.6, build 2</strong>—was installed and launched on both devices. Installation records verified that the existing save files stayed byte-identical through the update, before normal gameplay resumed.</p>
            <p className="reignition-doc-links">Build records: <a href={IOS_NOTES} target="_blank" rel="noopener noreferrer">iOS port notes</a>. Platform references: <a href={GODOT_IOS_EXPORT_GUIDE} target="_blank" rel="noopener noreferrer">Godot export</a> and <a href={XCODE_SIGNING_GUIDE} target="_blank" rel="noopener noreferrer">Xcode signing</a>.</p>
          </StoryChapter>

          <StoryChapter number="07" title="Turn each failure into a check">
            <p>The workflow became: reproduce, isolate, change, build, install, and retest. I used separate test save data so automated gameplay checks would not overwrite normal progress, and compared the tested resource pack and native framework with the delivered build.</p>
            <div className="reignition-evidence-grid">
              <div><strong>360</strong><span>Recorded automated checks across touch, rendered gameplay, rewards, layout, remapping, and quick title taps.</span></div>
              <div><strong>63</strong><span>Physical-iPhone checks for Rampage cold loading, startup preloading, and failure recovery.</span></div>
              <div><strong>49</strong><span>Gameplay checks passed on the physical M1 iPad, including jumping, spin visibility, pause, and saves.</span></div>
            </div>
            <p>Those counts describe different suites and test scopes, not unique features or a complete playthrough. The build also passed native AOT compilation, while the IPA checks covered ZIP integrity, device families, landscape orientations, the game pack, and the native C# framework.</p>
            <p className="reignition-doc-links">Explore the <a href={IOS_TESTS} target="_blank" rel="noopener noreferrer">regression tests</a> and <a href={`${GAME_REPOSITORY}/tree/c61e5d6bfa24dbdaa5d53c9fb4b695cefc597560/scripts/ios`} target="_blank" rel="noopener noreferrer">build and verification scripts</a>.</p>
          </StoryChapter>

          <StoryChapter number="08" title="From a working device build to a shareable release" className="reignition-outcome">
            <p>The result was a native iPhone/iPad port with touch controls, adapted layouts, and recorded device gameplay. Normal Rampage gameplay on the phone reached 4 of 20 enemies defeated; the iPad records confirmed installation and normal launch, alongside its earlier gameplay regression run.</p>
            <p>I then published the archived build on my fork with detailed installation instructions. The 2.65 GB IPA exceeded GitHub’s per-file limit, so the release contains two parts, a reassembly helper, and checksums. The original development profile has expired: testers must re-sign with their own active certificate and device profile.</p>
            <StoryImage src={ipadHandsOn} alt="Hands holding an iPad in landscape while playing Project Reignition with the on-screen movement stick and action buttons." caption="From the build pipeline to hands-on play: Project Reignition running on an iPad with the touch controls in use." />
            <div className="reignition-scene-gallery">
              <StoryImage src={moonlitStage} alt="Sonic in a moonlit palace scene from Project Reignition." caption="Supplied game image: the adventure the port aims to preserve. Capture device and build unspecified." />
              <StoryImage src={actionScene} alt="Sonic mid-action in a palace with enemies in the background." caption="Supplied game image: original character, environment, and action work credited to the game’s developers. Capture device and build unspecified." />
            </div>
            <p>The biggest lesson was that a port is a chain of assumptions to verify: input, rendering, resource lifetimes, layout, packaging, and deployment. Real hardware exposed failures a desktop build could not. A focused regression check made each resolved issue easier to keep resolved.</p>
            <p className="reignition-limit-note">This was device-tested porting work, not a claim of a bug-free game. A full playthrough, every mission, network party play, battery usage, and sustained performance remain outside the recorded test coverage.</p>
            <figure className="reignition-gameplay">
              <figcaption>Watch the port running. The linked footage is a demonstration, not a performance benchmark; its exact recording build is not established here.</figcaption>
              {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="reignition-gameplay-link">Open gameplay footage <FaExternalLinkAlt aria-hidden="true" /></a>}
            </figure>
            <div className="reignition-contribution">
              <h4>My contribution</h4>
              <ul>{['iOS integration & native C# builds', 'Multitouch controls', 'Phone & tablet layouts', 'Rendering & loading fixes', 'Regression tests', 'Signing, packaging & device testing'].map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="reignition-built-with">
              <h4>Built with</h4>
              <ul aria-label="Verified tools and technologies">{['Godot 4.7', 'C# / .NET', 'Godot Metal Mobile', 'Xcode', 'iOS App Signer', 'Codex'].map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <p className="reignition-source-note">Project Reignition and its original game content are the work of its original developers. My contribution is the iOS port and mobile adaptation. Sonic and associated characters belong to SEGA.</p>
            <nav className="reignition-final-links" aria-label="Project links">
              <a href={REIGNITION_RELEASE} target="_blank" rel="noopener noreferrer" className="reignition-button">Get the iOS Release <IoGameController aria-hidden="true" /></a>
              {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="reignition-source-link">Watch Gameplay <FaExternalLinkAlt aria-hidden="true" /></a>}
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
