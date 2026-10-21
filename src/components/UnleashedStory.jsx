import installerError from '../assets/projects/unleashed-installer-error.png';
import upsideDown from '../assets/projects/unleashed-upside-down.png';

function Chapter({ number, title, children }) {
  return (
    <section className="unleashed-chapter" aria-labelledby={`unleashed-chapter-${number}`}>
      <span className="unleashed-chapter-number" aria-hidden="true">{number}</span>
      <div className="unleashed-chapter-body">
        <h3 id={`unleashed-chapter-${number}`}>{title}</h3>
        {children}
      </div>
    </section>
  );
}

function StoryImage({ src, alt, children }) {
  return (
    <figure className="unleashed-story-figure">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge image: ${alt}`}>
        <img src={src} alt={alt} width="2868" height="1320" loading="lazy" decoding="async" />
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

      <Chapter number="01" title="Why This Game">
        <p>Sonic Unleashed was my favorite childhood game. After my Xbox 360 failed in Puerto Rico following Hurricane Maria, I lost access to it and kept looking for a way to play again.</p>
        <p>In June, a simple challenge gave that search a new direction:</p>
        <blockquote>“I’ll play Sonic if you put it on my phone.”</blockquote>
        <p>That became the goal: bring a game I grew up with to iPhone and iPad, and make it work as a mobile experience.</p>
      </Chapter>

      <Chapter number="02" title="Getting an iOS App to Install and Launch">
        <div className="unleashed-chapter-grid">
          <div>
            <p>An ARM64 executable was only one part of the port. iOS also needed a correctly structured app bundle, compatible deployment settings, signing, provisioning, and entitlements before the application could be installed and launched.</p>
            <p>Once the app was running, its own game-data installer presented a separate failure: it could not create a file in the app’s Documents directory. This screenshot captures that later stage, rather than an iOS signing error.</p>
            <p>I worked through the platform assumptions around startup, file access, and the installer’s workflow for selecting user-provided game, update, and DLC files. Separating installation problems from runtime crashes made it possible to investigate each with the right evidence.</p>
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
      </Chapter>

      <Chapter number="05" title="Moving to Native Metal">
        <p>I replaced the Vulkan-through-MoltenVK compatibility path with a native Metal renderer. That meant adapting command submission, pipeline creation, resource binding, and presentation to Apple’s graphics API.</p>
        <p>SPIRV-Cross translates the existing SPIR-V shaders into Metal Shading Language, allowing the port to use the project’s shader foundation while building native Metal pipelines around it.</p>
        <div className="unleashed-engineering-cards">
          <div><h4>Shaders &amp; pipelines</h4><p>Shader variants and pipeline setup needed to produce the correct image, not simply compile successfully.</p></div>
          <div><h4>Resource lifetimes</h4><p>Buffers, textures, and rendering resources had to stay valid for the GPU work that used them.</p></div>
          <div><h4>Synchronization &amp; presentation</h4><p>Command submission and presentation needed to cooperate with the device’s drawable and application lifecycle.</p></div>
        </div>
        <p>I validated gameplay, audio, rendering, and lifecycle transitions on real iPhone and iPad hardware. The later footage shows the resulting experience. It represents progress across the Metal transition and other fixes, rather than isolating Metal as the cause of every improvement.</p>
      </Chapter>

      <Chapter number="06" title="Making It Behave Like a Mobile Game">
        <p>Getting the graphics working still left the question of how to play. I added Xbox 360-inspired touchscreen controls, independent triggers, and simultaneous movement and button input, with layouts adapted for iPhone and iPad.</p>
        <div className="unleashed-lifecycle-story">
          <h4>Debugging the background freeze</h4>
          <dl>
            <div><dt>Symptom</dt><dd>Switching away and returning initially left the game unresponsive.</dd></div>
            <div><dt>Evidence</dt><dd>Device logs showed Metal rejecting GPU submissions made while the app was in the background.</dd></div>
            <div><dt>Change</dt><dd>I added a submission barrier that pauses new work, ensures committed buffers are scheduled, and resumes rendering when the application becomes active.</dd></div>
            <div><dt>Validation</dt><dd>I tested background-to-foreground transitions on real hardware alongside gameplay, audio, and touch input.</dd></div>
          </dl>
        </div>
      </Chapter>

      <Chapter number="07" title="What Shipped and What Remains">
        <p>The native Metal preview is available in the <a href={releaseUrl} target="_blank" rel="noopener noreferrer">v1.0.3 GitHub release</a>, with installation instructions. The port has been validated on real iPhone and iPad hardware; performance tuning and broader device testing remain ongoing. Portrait support is an experimental preview until device testing is complete.</p>
        <div className="unleashed-story-credits">
          <h4>Built on community work</h4>
          <p>Unleashed Recompiled and its contributors provided the foundation. My work here focuses on the iOS application integration, native Metal renderer adaptations, touchscreen controls, and platform debugging described above.</p>
          <p>Dusklight and Project Reignition are related parts of my work bringing games to Apple’s mobile hardware. Their own project pages cover those ports.</p>
          <div className="unleashed-related-projects"><a href="#/projects/dusklight">Dusklight</a><a href="#/projects/project-reignition">Project Reignition</a></div>
        </div>
      </Chapter>
    </div>
  );
}
