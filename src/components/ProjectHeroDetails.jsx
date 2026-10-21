import { useReducedMotion } from 'framer-motion';

export default function ProjectHeroDetails({ storyId, note, rightsHolder }) {
  const reducedMotion = useReducedMotion();
  const exploreStory = event => {
    event.preventDefault();
    const section = document.getElementById(storyId);
    const heading = section?.querySelector('h2');
    heading?.focus({ preventScroll: true });
    if (section) {
      window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 110, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  };
  return <div className="project-hero-details">
    <p className="project-hero-note">{note}</p>
    <a className="project-story-link" href={`#${storyId}`} onClick={exploreStory}>Explore the development story</a>
    {rightsHolder && <p className="project-game-notice">No game ISOs or files included. Supply your own copy. Not affiliated with or endorsed by {rightsHolder}.</p>}
  </div>;
}
