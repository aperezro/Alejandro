import profilePic from "../assets/alepic.png"
import { HERO_CONTENT } from "../constants"
import { FaArrowDown } from "react-icons/fa"
import { motion } from "framer-motion"

const Hero = () => {
    return (
        <div className="pb-4 lg:mb-36 overflow-hidden">
            <div className="flex flex-wrap lg:flex-row-reverse max-w-full">

               <div className="w-full lg:w-1/2">
  <div className="flex justify-center lg:p-8">
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative rounded-3xl p-[3px] bg-gradient-to-r from-stone-900 via-stone-300 to-stone-900 animate-gradient"
    >
      <img
        src={profilePic}
        alt="Alejandro Perez"
        className="rounded-3xl bg-black"
      />
    </motion.div>
  </div>
</div>


                <div className="w-full lg:w-1/2 min-w-0">
                    <motion.div 
                        className="flex flex-col items-center lg:items-start mt-10 max-w-full lg:ml-40"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <h2 className = "animated-gradient-text pb-2 text-4xl tracking-tighter lg:text-6xl xl:text-7xl break-words">
                            Alejandro Pérez
                        </h2>
                        <span className="bg-gradient-to-r from-stone-200 to-stone-400 bg-clip-text 
                        text-3xl tracking-tight text-transparent"> Full Stack Developer</span>
                        <p className="my-2 max-w-lg py-6 text-xl leading-relaxed tracking-tighter">
                            {HERO_CONTENT}


                        </p>
                        <motion.a 
                            href="/Alejandro/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Alejandro_Perez_Resume.pdf"
                            className="bg-white rounded-full p-4.5 text-lg text-stone-800 mb-10 shadow-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] focus-visible:scale-105 relative overflow-hidden max-w-full"
                            whileHover="hover"
                            initial="initial"
                        >
                            <motion.div
                                variants={{
                                    initial: { y: 0, opacity: 1 },
                                    hover: { y: -20, opacity: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                Download Resume
                            </motion.div>
                            <motion.div
                                variants={{
                                    initial: { y: 20, opacity: 0 },
                                    hover: { y: 0, opacity: 1 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                Download Resume <FaArrowDown className="ml-2" />
                            </motion.div>
                        </motion.a>

                        

                        </motion.div>
                </div>
                
            </div>
        </div>
        )
}
export default Hero
