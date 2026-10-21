import { useReducedMotion } from 'framer-motion';
import { ENGINEERING_HIGHLIGHTS } from '../constants/projectOverview';
import { navigateToSection } from '../utils/sectionNavigation';
import { STORY_CHAPTERS } from '../constants/storyChapters';

export default function EngineeringHighlights({ slug }) {
  const reducedMotion = useReducedMotion();
  return <section className="engineering-highlights" aria-labelledby={`${slug}-highlights`}>
    <h3 id={`${slug}-highlights`}>Engineering Highlights</h3>
    <ul>{ENGINEERING_HIGHLIGHTS[slug].map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ul>
    <details className="story-outline">
      <summary>Jump to a story chapter</summary>
      <nav aria-label="Development story chapters">
        {STORY_CHAPTERS[slug].map(({ id, title }, index) => <a key={id} href={`#${id}`} onClick={event => navigateToSection(event, id, reducedMotion)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{title}</a>)}
      </nav>
    </details>
  </section>;
}
