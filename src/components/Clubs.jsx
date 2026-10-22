import { CLUBS } from '../constants'
import { FaYoutube } from "react-icons/fa"
import { BiHandicap } from "react-icons/bi"
import { motion as Motion } from "framer-motion"

const Clubs = () => {
  return (
    <div className="pb-4">
      <div className="max-w-full overflow-hidden">
        {CLUBS.map((project, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center max-w-full">

            <Motion.div
              viewport={{ once: true }}
              whileInView={{opacity: 1,x: 0 }}
              initial={{opacity: 0,x: -100 }}
              transition={{duration: 1}}
              className="mb-4 w-full lg:w-1/4 min-w-0"
            >
              <img
                src={project.image}
                loading="lazy"
                decoding="async"
                alt={project.title}
                width={200}
                height={150}
                className="h-[75px] w-[100px] lg:h-[150px] lg:w-[200px] object-contain object-left lg:translate-y-3"
              />
            </Motion.div>

            <Motion.div
              viewport={{ once: true }}
              whileInView={{opacity: 1,x: 0 }}
              initial={{opacity: 0,x: 100 }}
              transition={{duration: 1}}
              className="w-full max-w-xl lg:w-3/4 min-w-0"
            >
              <h4 className="mb-2 font-semibold text-2xl">{project.title}</h4>
              {project.role && <p className="mb-1 text-lg font-semibold text-stone-200">{project.role}</p>}
              {project.year && <p className="mb-4 text-base font-bold text-stone-300">{project.year}</p>}
              <p className='mb-4 leading-relaxed text-stone-300'>{project.description}</p>
              {project.organizationUrl && <a href={project.organizationUrl} target="_blank" rel="noopener noreferrer" aria-label={`Learn about ${project.title}`} className="mb-4 inline-flex min-h-11 items-center text-sm text-stone-200 underline decoration-stone-500 underline-offset-4 hover:text-white">About the organization</a>}

              <div className="flex flex-wrap items-center gap-2">
                {project.technologies.map((tech, index) => (
                  <span className="mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300" key={index}>
                    {tech}
                  </span>
                ))}


                {project.title === "Manny's Quest Game" && (
                  <Motion.button
                    onClick={() => window.open('https://youtu.be/Tbj9qGEH-MU', '_blank')}
                    className="ml-2 flex items-center gap-2 rounded bg-stone-900 px-3 py-2 text-red-500 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaYoutube size={18} />
                    View Project
                  </Motion.button>
                )}


                {project.title === "Autonomous Roomba" && (
                  <Motion.button
                    onClick={() => window.open('https://youtu.be/Sz_m1Ht0rnQ', '_blank')}
                    className="ml-2 flex items-center gap-2 rounded bg-stone-900 px-3 py-2 text-red-500 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaYoutube size={18} />
                    View Project
                  </Motion.button>
                )}


                {project.title === "C Programs using a Playstation 4 Controller" && (
                  <div className="ml-2 rounded bg-stone-900 p-2 text-blue-400">
                    <BiHandicap size={16} />
                  </div>
                )}
              </div>
            </Motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clubs
