import { PROJECTS, PROJECT_PAGES } from '../constants'
import { BiHandicap } from "react-icons/bi"
import { motion } from "framer-motion"

const Projects = () => {
  return (
    <section id="projects" className="pb-4">
      <motion.div 
        className="my-20 flex justify-center"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-black to-stone-500">
          <div className="rounded-2xl bg-black px-8 py-6 text-center">
            <h2 className="animated-stone-gradient-text text-4xl">Projects</h2>
          </div>
        </div>
      </motion.div> 

      <div className="max-w-full overflow-hidden px-4">
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-8 flex flex-wrap items-start gap-6 lg:gap-12 lg:justify-center max-w-full">
            
            <motion.div 
              whileInView={{opacity: 1,x: 0 }}
              initial={{opacity: 0,x: -100 }}
              transition={{duration: 1}}
              className="w-full lg:w-1/4 lg:pr-8 min-w-0"
            >
              <img 
                src={project.image} 
                alt={project.title}
                width={250}
                height={180}
                className={`mb-6 max-w-full rounded ${
                  project.title === "CyCourse App"
                    ? "h-auto w-[250px]"
                    : "h-[180px] w-[250px] object-contain object-left"
                }`}
              />
            </motion.div>

            <motion.div 
              whileInView={{opacity: 1,x: 0 }}
              initial={{opacity: 0,x: 100 }}
              transition={{duration: 1}}
              className="w-full max-w-xl lg:w-3/4 min-w-0"
            >
              <h3 className="mb-2 font-semibold text-2xl">{project.title}</h3>
              <p className='mb-4 text-stone-400'>{project.description}</p>
              
              <div className="flex flex-wrap items-center gap-2">
                {project.technologies.map((tech, index) => (
                  <span className="mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300" key={index}>
                    {tech}
                  </span>
                ))}

                {PROJECT_PAGES.some(page => page.slug === project.slug) && <motion.a
                  href={`#/projects/${project.slug}`}
                  aria-label={`View project: ${project.title}`}
                  className="inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-stone-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >View Project <span aria-hidden="true">↗</span></motion.a>}
                {project.footageUrl && !['project-reignition', 'dusklight'].includes(project.slug) && (
                  <a href={project.footageUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-stone-600 px-4 py-2 text-sm hover:bg-stone-800">View Footage</a>
                )}

                {project.title === "C Programs using a Playstation 4 Controller" && (
                  <div className="ml-2 rounded bg-stone-900 p-2 text-blue-400">
                    <BiHandicap size={16} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
