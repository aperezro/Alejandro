import { motion as Motion, useReducedMotion } from 'framer-motion';
import installerError from '../assets/projects/unleashed-installer-error.png';
import upsideDown from '../assets/projects/unleashed-upside-down.png';
import sonicChipReference from '../assets/projects/unleashed-sonic-chip-reference.jpg';
import trailerReference from '../assets/projects/unleashed-trailer-reference.webp';

function Chapter({ number, title, children }) {
  const reducedMotion = useReducedMotion();

  return (
    <Motion.section
      className="unleashed-chapter"
      aria-labelledby={`unleashed-chapter-${number}`}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: 'easeOut' }}
    >
      <span className="unleashed-chapter-number" aria-hidden="true">{number}</span>
      <div className="unleashed-chapter-body">
        <h3 id={`unleashed-chapter-${number}`}>{title}</h3>
        {children}
      </div>
    </Motion.section>
  );
}

function StoryImage({ src, alt, children, width = 2868, height = 1320, className = '' }) {
  return (
    <figure className={`unleashed-story-figure ${className}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge image: ${alt}`}>
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
      <figcaption>{children}<span className="unleashed-image-hint">Open image to inspect</span></figcaption>
    </figure>
  );
}

export default function UnleashedStory({ releaseUrl }) {
  const media = `${import.meta.env.BASE_URL}media/`;
  return (
    <div className="unleashed-story-content">
      <p className="unleashed-story-intro">From a childhood favorite to a native iOS port. The finished game came after installation failures, a black screen, an upside-down first frame, and a renderer that still needed to become playable.</p>
      <figure className="unleashed-story-figure unleashed-story-demo">
        <div className="unleashed-footage-label"><span>The result</span><span>Native Metal · iOS</span></div>
        <video controls playsInline preload="none" poster={`${media}sonic-ios-story-poster.jpg`} aria-label="Working Sonic Unleashed native iOS port with touchscreen controls">
          <source src={`${media}sonic-ios-demo.mp4`} type="video/mp4" />
          Your browser does not support embedded video. <a href={`${media}sonic-ios-demo.mp4`}>Open the gameplay recording</a>.
        </video>
        <figcaption>Working gameplay with touchscreen controls. This development recording shows a milestone, rather than a controlled performance benchmark.</figcaption>
      </figure>

      <div className="unleashed-story-timeline">
      <Chapter number="01" title="Why This Game">
        <p>Sonic Unleashed was my favorite childhood game. After my Xbox 360 failed in Puerto Rico following Hurricane Maria, I lost access to it and kept looking for a way to play again.</p>
        <p>In June, a simple challenge gave that search a new direction:</p>
        <blockquote>“I’ll play Sonic if you put it on my phone.”</blockquote>
        <p>That became the goal: bring a game I grew up with to iPhone and iPad, and make it work as a mobile experience.</p>
        <StoryImage width={1200} height={675} src={sonicChipReference} alt="Sonic and Chip standing together in a village scene from Sonic Unleashed.">
          Sonic and Chip in the adventure that inspired this project. Game reference image; not an iOS test capture.
        </StoryImage>
      </Chapter>

      <Chapter number="02" title="Getting an iOS App to Install and Launch">
        <div className="unleashed-chapter-grid">
          <div>
            <p>An ARM64 executable was only one part of the port. iOS also needed a correctly structured app bundle, compatible deployment settings, signing, provisioning, and entitlements before the application could be installed and launched.</p>
            <p>Once the app was running, its own game-data installer presented a separate failure: it could not create a file in the app’s Documents directory. This screenshot captures that later stage, rather than an iOS signing error.</p>
            <p>I worked through the platform assumptions around startup, file access, and the installer’s workflow for selecting user-provided game, update, and DLC files. Separating installation problems from runtime crashes made it possible to investigate each with the right evidence.</p>
            <p>Large disc images introduced another platform constraint. I adapted the XenonRecomp file reader to fall back from a full-file memory map (<code>mmap</code>) to a partial map and streaming I/O when mapping failed. That let the installer read game data without depending on one large contiguous mapping.</p>
            <p>Startup also required separating UIKit event processing from guest execution. I moved the recompiled game entry point to a guest thread while the main thread continued pumping SDL events. SDL’s UIKit integration needed scene lifecycle support so window creation, activation, and background notifications reached the application correctly.</p>
          </div>
          <StoryImage src={installerError} alt="The running game installer reports that it failed to create a file in the iOS app’s Documents directory.">
            The app had launched, but installing its game data still failed. Getting to a running application and getting through its installer were separate milestones.
          </StoryImage>
        </div>
      </Chapter>

      <Chapter number="03" title="Audio, a Black Screen, and the First Visible Frame">
        <div className="unleashed-chapter-grid">
          <div>
            <p>Hearing music behind a black screen was useful evidence: parts of the application were already running. The next investigation focused on rendering and presentation, including shader compilation, drawable dimensions, swapchain state, and resource lifetimes.</p>
            <p>I used device console logs to distinguish SPIR-V-to-MSL translation failures from Metal library and pipeline creation failures, then checked whether drawable acquisition succeeded. Logging viewport and swapchain dimensions helped separate an invalid presentation surface from a frame that had rendered incorrectly. The native presentation surface is a <code>CAMetalLayer</code>, connected through SDL’s Metal view.</p>
            <p>The first recognizable image was progress, even though it appeared upside down. It exposed a disagreement about vertical orientation between the renderer and presentation path.</p>
            <p>Fixing the rendering orientation and aspect-ratio issues turned that intermediate result into a correctly presented image. Visible output gave me something concrete to validate on the device.</p>
          </div>
          <StoryImage src={upsideDown} alt="An early iOS build renders Sonic and the language-selection installer screen upside down.">
            The first recognizable image exposed another problem: the renderer and presentation path disagreed about vertical orientation.
          </StoryImage>
        </div>
      </Chapter>

      <Chapter number="04" title="Running Wasn’t Yet Playable">
        <div className="unleashed-performance-note"><span>Early Vulkan build</span><strong>~5 FPS</strong><span>Proof of concept</span></div>
        <p>The first Vulkan build proved that the game could run on an iPhone. At roughly five frames per second, however, it was still a proof of concept. The next challenge was making it responsive enough to play.</p>
        <p>That changed the focus from reaching a visible frame to improving the graphics path, while continuing to resolve platform and rendering issues.</p>
        <figure className="unleashed-story-figure unleashed-story-demo">
          <div className="unleashed-footage-label"><span>Early Vulkan build</span><span>Approx. 5 FPS</span></div>
          <video controls playsInline preload="none" poster={`${media}sonic-ios-early-gameplay-poster.jpg`} aria-label="Sonic Unleashed running slowly in an early iOS Vulkan build">
            <source src={`${media}sonic-ios-early-gameplay.mp4`} type="video/mp4" />
            Your browser does not support embedded video. <a href={`${media}sonic-ios-early-gameplay.mp4`}>Open the early gameplay recording</a>.
          </video>
          <figcaption>Early gameplay showing the roughly five-frames-per-second Vulkan proof of concept.</figcaption>
        </figure>
      </Chapter>

      <Chapter number="05" title="Moving to Native Metal">
        <p>I switched the iOS graphics path from Vulkan through MoltenVK to Plume’s native Metal backend, adapting and repairing the existing renderer for the port. That meant working directly with Metal command submission, pipeline creation, resource binding, and presentation. This built on the project’s rendering abstraction rather than creating an entire graphics engine from scratch.</p>
        <p>SPIRV-Cross translates the existing SPIR-V shaders into Metal Shading Language, allowing the port to use the project’s shader foundation while building native Metal pipelines around it.</p>
        <div className="unleashed-engineering-cards">
          <div><h4>Shaders &amp; pipelines</h4><p>I added fragment-shader variants without depth output for render passes lacking a depth attachment, corrected descriptor binding lookup and argument-buffer array sizes, and limited push-constant uploads to their actual declared ranges.</p></div>
          <div><h4>Resource lifetimes</h4><p>Metal command buffers and encoders needed explicit retention, while acquired drawables had to remain alive until presentation completed. Autorelease pools bounded temporary Objective-C allocations on rendering threads.</p></div>
          <div><h4>Synchronization &amp; presentation</h4><p>I worked through the acquire → render → present sequence, using Metal events between submissions and completion handlers to signal CPU fences. Drawable sizing and GPU-address resource residency also needed attention.</p></div>
        </div>
        <p>I validated gameplay, audio, rendering, and lifecycle transitions on real iPhone and iPad hardware. The later footage shows the resulting experience. It represents progress across the Metal transition and other fixes, rather than isolating Metal as the cause of every improvement.</p>
        <p>Sampled device logs later recorded roughly 35–44 FPS in gameplay on the iPhone 17 Pro Max at the tested resolution settings. This was not a locked 60 FPS result or a matched comparison with the early clip. The Metal GPU timestamp queries were still unimplemented, so a reported GPU time of zero could not be used as a performance measurement.</p>
        <figure className="unleashed-story-figure unleashed-story-demo">
          <div className="unleashed-footage-label"><span>Native Metal gameplay</span><span>iOS</span></div>
          <video controls playsInline preload="none" poster={`${media}sonic-ios-native-metal-poster.jpg`} aria-label="Sonic Unleashed gameplay running on the native Metal iOS port">
            <source src={`${media}sonic-ios-native-metal.mp4`} type="video/mp4" />
            Your browser does not support embedded video. <a href={`${media}sonic-ios-native-metal.mp4`}>Open the native Metal gameplay recording</a>.
          </video>
          <figcaption>Gameplay running on the native Metal iOS port.</figcaption>
        </figure>
      </Chapter>

      <Chapter number="06" title="Making It Behave Like a Mobile Game">
        <p>Getting the graphics working still left the question of how to play. I added Xbox 360-inspired touchscreen controls, independent triggers, and simultaneous movement and button input, with layouts adapted for iPhone and iPad.</p>
        <p>Each touch owns its button or stick through an SDL finger ID, allowing movement and actions at the same time. I replaced first-match button selection with nearest-target hit testing to reduce ambiguous presses, separated LT/RT from LB/RB, and reset input when focus changed. On iOS, SDL events are queued from the main thread for ImGui to consume on the presenting thread, avoiding concurrent access to its UI state.</p>
        <div className="unleashed-lifecycle-story">
          <h4>Debugging the background freeze</h4>
          <dl>
            <div><dt>Symptom</dt><dd>Switching away and returning initially left the game unresponsive.</dd></div>
            <div><dt>Evidence</dt><dd>The console reported <code>kIOGPUCommandBufferCallbackErrorBackgroundExecutionNotPermitted</code>, followed by ignored submissions. Frames stopped recovering after the app returned to the foreground.</dd></div>
            <div><dt>Change</dt><dd>A mutex and condition variable gate new submissions across rendering, acquisition, and presentation. On deactivation, the barrier calls <code>waitUntilScheduled()</code> on the tracked tail of each command queue. Activation wakes the waiting threads and restores focus; held touches are cleared.</dd></div>
            <div><dt>Validation</dt><dd>I repeatedly switched to Settings and returned without restarting the game. Logs showed paired suspend/resume messages without the previous Metal errors, frames continued, and hands-on testing confirmed that movement and A still responded.</dd></div>
          </dl>
        </div>
      </Chapter>

      <Chapter number="07" title="What Shipped and What Remains">
        <p>The native Metal preview is available in the <a href={releaseUrl} target="_blank" rel="noopener noreferrer">v1.0.3 GitHub release</a>, with installation instructions. Tested hardware includes an iPhone 17 Pro Max and a 12.9-inch M1 iPad Pro. The published build targets iOS/iPadOS 27.0 and requires re-signing; game files are supplied separately by the user. Performance tuning and broader device testing remain ongoing.</p>
        <p>A separate portrait preview adds orientation support, a dedicated touch layout, and camera field-of-view adjustments. It compiles and passes layout bounds checks, but portrait gameplay, HUD readability, and live rotation still require device verification.</p>
        <div className="unleashed-story-credits">
          <h4>Built on community work</h4>
          <p>Unleashed Recompiled and its contributors provided the foundation. My work here focuses on the iOS application integration, native Metal renderer adaptations, touchscreen controls, and platform debugging described above.</p>
          <p>Work on Dusklight and Project Reignition helped me get unstuck by providing reference points for iOS packaging, signing, native-library integration, and device constraints. Those projects informed the investigation; Unleashed still needed its own renderer, installer, input, and lifecycle fixes.</p>
        </div>
        <StoryImage className="unleashed-smiling-image" width={1200} height={900} src={trailerReference} alt="Close-up of Sonic wearing a ring, from the Unleashed Recompiled release trailer.">
          From the Unleashed Recompiled release trailer. Community project imagery; not an iOS test capture.
        </StoryImage>
      </Chapter>
      </div>
    </div>
  );
}
