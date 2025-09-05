import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <div className="pb-4 px-4"> {/* add side padding on mobile */}
      <motion.div 
        className="my-20 flex justify-center"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-stone-500 to-black">
          <div className="rounded-2xl bg-black px-8 py-6 text-center">
            <h2 className="animated-stone-gradient-text text-4xl">Experience</h2>
          </div>
        </div>
      </motion.div>

      <div>
        {EXPERIENCES.map((experience, index) => (
          <motion.div 
            key={index} 
            className="mb-8 flex flex-wrap lg:justify-center"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <div className="w-full lg:w-1/4">
              <p className="mb-2 text-sm text-stone-400">{experience.year}</p>
            </div>

            {/* min-w-0 lets this flex child actually shrink on small screens */}
            <div className="w-full max-w-xl lg:w-3/4 min-w-0">
              <h3 className="mb-2 font-semibold">
                {experience.role}{" - "}
                <span className="text-sm text-stone-500">{experience.company}</span>
              </h3>

              <p className="mb-4 text-stone-400">{experience.description}</p>

              {/* Wrap chips and prevent horizontal overflow */}
              <div className="mt-4 flex flex-wrap gap-2 break-words">
                {experience.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="rounded bg-stone-900 px-2 py-1 text-sm font-medium text-stone-300"
                    whileHover={{ scale: 1.05, backgroundColor: "#404040" }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Experience;
