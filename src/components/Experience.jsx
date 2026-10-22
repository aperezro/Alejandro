import Clubs from "./Clubs";
import { EXPERIENCES } from "../constants";
import { motion as Motion } from "framer-motion";

const Experience = () => {
  return (
    <div className="pb-4 px-4">
      <Motion.div
        className="my-20 flex justify-center"
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-stone-500 to-black">
          <div className="rounded-2xl bg-black px-8 py-6 text-center">
            <h2 className="animated-stone-gradient-text text-4xl">Experience</h2>
          </div>
        </div>
      </Motion.div>

      <div>
        {[
          { id: 'professional-experience', title: 'Professional software engineering', entries: EXPERIENCES.filter(entry => entry.role !== 'Resident Assistant') },
          { id: 'campus-involvement', title: 'Leadership & Campus Involvement', entries: EXPERIENCES.filter(entry => entry.role === 'Resident Assistant') },
        ].map(group => <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`}>
          <h3 id={`${group.id}-title`} className="experience-group-title">{group.title}</h3>
          {group.entries.map(experience => {
            const index = EXPERIENCES.indexOf(experience);
            return (
          <Motion.div
            key={experience.company}
            className={`experience-entry mb-8 flex flex-wrap lg:justify-center ${index === 0 ? "experience-current" : ""}`}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <div className="w-full lg:w-1/4 flex flex-col-reverse lg:flex-col">
              <p className="mb-2 text-base font-bold text-stone-200">{experience.year}</p>
              {experience.image && (
                <div className="mb-4 flex justify-start">
                  <img
                    src={experience.image}
                    loading="lazy"
                    decoding="async"
                    width={200}
                    height={150}
                    alt={experience.company}
                    className="max-w-[100px] max-h-[75px] lg:max-w-[200px] lg:max-h-[150px] object-contain lg:translate-y-3"
                  />
                </div>
              )}
            </div>

            <div className="w-full max-w-xl lg:w-3/4 min-w-0">
              {index === 0 && <p className="experience-current-label">Current engineering role</p>}
              <h4 className="mb-1 text-xl font-semibold text-stone-100">{experience.role}</h4>
              <p className="mb-3 font-medium text-stone-200">{experience.company}</p>
              <p className="mb-4 leading-relaxed text-stone-300">{experience.description}</p>


              {experience.company === "Desi Eats" && (
                <Motion.a
                  href="https://aperezro.github.io/Desi/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(255,140,0,0.8)" }}
                  transition={{ duration: 0.3 }}
                >
                  View Website
                </Motion.a>
              )}

              <div className="mt-4 flex flex-wrap gap-2 break-words">
                {experience.technologies.map((tech, i) => (
                  <Motion.span
                    key={i}
                    className="rounded bg-stone-900 px-2 py-1 text-sm font-medium text-stone-300"
                    whileHover={{ scale: 1.05, backgroundColor: "#404040" }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </Motion.span>
                ))}
              </div>
            </div>
          </Motion.div>
            );
          })}
          {group.id === 'campus-involvement' && <Clubs />}
        </section>)}
      </div>
    </div>
  );
};

export default Experience;
