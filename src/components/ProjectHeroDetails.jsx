import { FaChevronDown } from 'react-icons/fa';
import { navigateToSection } from '../utils/sectionNavigation';
import { useReducedMotion } from 'framer-motion';

export default function ProjectHeroDetails({ storyId, note, rightsHolder }) {
  const reducedMotion = useReducedMotion();
  return <div className="project-hero-details">
    <p className="project-hero-note">{note}</p>
    <a className="project-story-link" href={`#${storyId}`} onClick={event => navigateToSection(event, storyId, reducedMotion)}>Explore the development story <FaChevronDown aria-hidden="true" /></a>
    {rightsHolder && <p className="project-game-notice">No game ISOs or files included. Supply your own copy. Not affiliated with or endorsed by {rightsHolder}.</p>}
  </div>;
}
