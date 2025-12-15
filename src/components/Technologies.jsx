import { RiReactjsLine } from 'react-icons/ri'
import { TbBrandNextjs } from 'react-icons/tb'
import { FaNodeJs } from 'react-icons/fa'
import { FaDocker } from "react-icons/fa";
import { SiMongodb } from 'react-icons/si'
import { FaShopify } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { FaAndroid } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { DiGit } from "react-icons/di";
import { DiJava } from "react-icons/di";


import{animate, motion} from 'framer-motion'



const iconVariants = (duration) => ({
    initial: {y: -10},
    animate: {
        y:[10, -10],
    transition:{
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",

    } }
})







const Technologies = () => {
  return (
    <div className="pb-24">
<motion.div 
  className="my-20 flex justify-center"
  whileInView={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: -100 }}
  transition={{ duration: 1.5 }}
>
  <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-stone-500 to-black">
    <div className="rounded-2xl bg-black px-8 py-6 text-center">
      <h2 className="animated-stone-gradient-text text-4xl">
        Technologies
      </h2>
    </div>
  </div>
</motion.div>

        <motion.div 
        whileInView={{opacity: 1,x: 0 }}
        initial={{opacity: 0,x: -100 }}
        transition={{duration: 1.5}}
        className="flex flex-wrap items-center justify-center gap-4 max-w-full overflow-hidden px-4">
            
            <motion.div
                initial="initial"
                animate="animate"
                variants={iconVariants(2.5)}
                className="p-4" >
            
                <RiReactjsLine className="text-5xl lg:text-6xl text-cyan-400" />
            </motion.div>

            <motion.div
            initial="initial"
                animate="animate"
                variants={iconVariants(2)}
                 className="p-4">
                <TbBrandNextjs className="text-5xl lg:text-6xl" />
            </motion.div>

            <motion.div 
            initial="initial"
            animate="animate"
            variants={iconVariants(2.5)}
            className="p-4">
                <SiMongodb className="text-5xl lg:text-6xl text-cyan-500" />
            </motion.div>
            

            <motion.div 
            initial="initial"
            animate="animate"
                variants={iconVariants(6)}
            className="p-4">
                <FaNodeJs  className="text-5xl lg:text-6xl text-green-500" />
            </motion.div>

            <motion.div 
            initial="initial"
            animate="animate"
            variants={iconVariants(4)}
            className="p-4">
                <FaShopify  className="text-5xl lg:text-6xl text-green-300" />
            </motion.div>

            <motion.div
            initial="initial"
            animate="animate"
            variants={iconVariants(2.5)} 
            className="p-4">
                <IoLogoFirebase  className="text-5xl lg:text-6xl text-orange-300" />
            </motion.div>

            <motion.div 
            initial="initial"
            animate="animate"
            variants={iconVariants(4.5)}
            className="p-4">
                <FaAndroid  className="text-5xl lg:text-6xl text-green-400" />
            </motion.div>

            <motion.div  
            initial="initial"
            animate="animate"
            variants={iconVariants(2.5)}
            className="p-4">
                <FaHtml5  className="text-5xl lg:text-6xl text-orange-500" />
            </motion.div>

            <motion.div  
            initial="initial"
            animate="animate"
            variants={iconVariants(3.5)}
            className="p-4">
                <FaPython  className="text-5xl lg:text-6xl text-yellow-500" />
            </motion.div>
            <motion.div  
            initial="initial"
            animate="animate"
            variants={iconVariants(2.5)}
            className="p-4">
                <DiGit  className="text-5xl lg:text-6xl text-stone-500" />
            </motion.div>
            <motion.div  
            initial="initial"
            animate="animate"
            variants={iconVariants(2)}
            className="p-4">
                <DiJava  className="text-5xl lg:text-6xl text-red-500" />
            </motion.div>
             <motion.div  
            initial="initial"
            animate="animate"
            variants={iconVariants(1.5)}
            className="p-4">
                <FaDocker className="text-5xl lg:text-6xl text-blue-500" />
            </motion.div>

            



            </motion.div>

    </div>
  )
}
export default Technologies