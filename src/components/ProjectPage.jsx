import { IoHammerSharp } from "react-icons/io5";
import { useEffect } from 'react';
import { PROJECT_PAGES, projectPageTitle } from '../constants';
import FeaturedProject from './FeaturedProject';
import './ProjectPage.css';
import ReignitionProject from './ReignitionProject';
import DusklightProject from './DusklightProject';

export default function ProjectPage({ slug }) {
  const project = PROJECT_PAGES.find(project => project.slug === slug);
  useEffect(() => {
    document.title = project ? `${project.title} | Alejandro Pérez` : 'Project not found | Alejandro Pérez';
    return () => { document.title = 'Alejandro Perez Robles'; };
  }, [project]);
  const projectIndex = PROJECT_PAGES.findIndex(item => item.slug === slug);
  const neighbors = project ? [
    { label: 'Previous project', project: PROJECT_PAGES[(projectIndex + PROJECT_PAGES.length - 1) % PROJECT_PAGES.length] },
    { label: 'Next project', project: PROJECT_PAGES[(projectIndex + 1) % PROJECT_PAGES.length] },
  ] : [];
  return (
    <div className={`project-page mx-auto py-4 sm:py-5 ${['unleashed-recompiled', 'project-reignition', 'dusklight'].includes(slug) ? 'max-w-7xl' : 'max-w-6xl'} ${slug === 'project-reignition' ? 'reignition-page' : ''} ${slug === 'dusklight' ? 'dusklight-page' : ''}`}>
      <a href="#projects" className="project-back-link mb-4 inline-flex items-center gap-2 rounded-full border border-stone-600 bg-black/60 px-5 py-3 text-sm hover:bg-stone-800">← All Projects</a>
      {!project ? <div className="py-20"><h1 className="text-4xl text-white">Project not found</h1><p className="mt-4">Choose a project from the navigation or return to the project list.</p></div> : project.slug === 'unleashed-recompiled' ? <FeaturedProject /> : project.slug === 'project-reignition' ? <ReignitionProject project={project} /> : project.slug === 'dusklight' ? <DusklightProject project={project} /> : (
        <article className="min-w-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Project / {project.title}</p>
          <h1 className="animated-stone-gradient-text max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <div className="mt-7 flex flex-wrap gap-2">{project.technologies.map(tech => <span key={tech} className="rounded-full border border-stone-600 bg-black/50 px-4 py-2 text-sm">{tech}</span>)}</div>
          <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
            <div className="rounded-3xl border border-stone-700 bg-stone-950/90 p-6"><img src={project.image} alt={project.title} className="mx-auto max-h-[480px] w-full rounded-xl object-contain" /></div>
            <div className="rounded-3xl border border-stone-800 bg-black/70 p-6 sm:p-8">
              <h2 className="mb-5 text-2xl font-semibold text-white">About the project</h2>
              <div className="space-y-4 text-base leading-relaxed text-stone-300">{project.description.split(/\.\s+(?=[A-Z])/).map((sentence, index) => <p key={index}>{sentence.endsWith('.') ? sentence : `${sentence}.`}</p>)}</div>
              {project.footageUrl && <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-stone-200">Watch Demonstration <IoHammerSharp aria-hidden="true" className="ml-1 inline-block align-[-0.125em]" /></a>}
            </div>
          </div>
        </article>
      )}
      {project && <nav aria-label="More projects" className="project-more"><h2>Explore more projects</h2><div className="project-more-links">{neighbors.map(({ label, project: item }) => <a key={item.slug} href={`#/projects/${item.slug}`}><span className="project-neighbor-label">{label}</span><span>{projectPageTitle(item)} <IoHammerSharp aria-hidden="true" className="ml-1 inline-block align-[-0.125em]" /></span></a>)}<a className="project-all-link" href="#projects">All Projects</a></div></nav>}
    </div>
  );
}
