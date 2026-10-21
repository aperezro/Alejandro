import { PROJECTS } from '../constants';

const FeaturedProject = () => {
  const project = PROJECTS.find(project => project.title === 'Unleashed Recompiled');
  const media = `${import.meta.env.BASE_URL}media/`;
  return (
    <article id="sonic-ios" className="mx-auto mb-16 max-w-6xl overflow-hidden rounded-3xl border border-stone-700 bg-stone-950/90">
      <div className="p-6 sm:p-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">Featured project · Independent engineering</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Sonic Unleashed — iOS Port</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-stone-300">Porting the community-developed Unleashed Recompiled project to iPhone and iPad as a native ARM64 application.</p>
      </div>
      <video controls playsInline preload="none" poster={`${media}sonic-unleashed-fallback.jpg`} className="aspect-[4/3] max-h-[660px] w-full bg-black object-contain" aria-label="Full 22-second gameplay demonstration of Unleashed Recompiled on iOS">
        <source src={`${media}sonic-ios-demo.mp4`} type="video/mp4" />
        Your browser does not support embedded video. <a href={`${media}sonic-ios-demo.mp4`}>Download the gameplay demonstration.</a>
      </video>
      <div className="p-6 sm:p-9">
        <p className="mb-7 text-sm text-stone-400">22-second demonstration captured on iOS, with touchscreen controls visible.</p>
        <div className="grid gap-8 md:grid-cols-2">
          <div><h2 className="mb-3 text-lg font-semibold text-white">My contributions</h2><p className="leading-relaxed text-stone-300">{project.description}</p></div>
          <div><h2 className="mb-3 text-lg font-semibold text-white">Engineering challenges</h2>
            <ul className="list-disc space-y-3 pl-5 leading-relaxed text-stone-300">
              <li>Adapted application startup, signing, and memory mapping for ARM64 and the iOS lifecycle.</li>
              <li>Replaced the Vulkan compatibility path with native Metal rendering and shader translation.</li>
              <li>Resolved rendering orientation, aspect ratios, and background-resume freezes.</li>
              <li>Built responsive touch controls and validated gameplay on iPhone and iPad.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">{['C++', 'ARM64', 'iOS / iPadOS', 'Metal', 'SPIR-V', 'Xcode'].map(tech => <span key={tech} className="rounded-lg border border-stone-700 px-3 py-2 text-sm">{tech}</span>)}</div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default FeaturedProject;
