import { CLUBS } from '../constants'
import { FaYoutube } from "react-icons/fa"
import { BiHandicap } from "react-icons/bi"
import { motion } from "framer-motion"

const Clubs = () => {
  return (
    <div className="pb-4">
      <motion.div 
        className="my-20 flex justify-center"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-black to-stone-500">
          <div className="rounded-2xl bg-black px-8 py-6 text-center">
            <h2 className="animated-stone-gradient-text text-4xl">Campus Involvement</h2>
          </div>
        </div>
      </motion.div> 

      <div className="max-w-full overflow-hidden px-4">
        {CLUBS.map((project, index) => (
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
                height={250}
                className="mb-6 rounded max-w-full h-auto"
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

                
                {project.title === "Manny's Quest Game" && (
                  <motion.button
                    onClick={() => window.open('https://youtu.be/Tbj9qGEH-MU', '_blank')}
                    className="ml-2 flex items-center gap-2 rounded bg-stone-900 px-3 py-2 text-red-500 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaYoutube size={18} />
                    View Project
                  </motion.button>
                )}

           
                {project.title === "Autonomous Roomba" && (
                  <motion.button
                    onClick={() => window.open('https://youtu.be/Sz_m1Ht0rnQ', '_blank')}
                    className="ml-2 flex items-center gap-2 rounded bg-stone-900 px-3 py-2 text-red-500 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaYoutube size={18} />
                    View Project
                  </motion.button>
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
    </div>
  )
}

export default Clubs
