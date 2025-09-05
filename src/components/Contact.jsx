import { CONTACT } from "../constants"
import { CiMail } from "react-icons/ci";
import { motion } from "framer-motion";


const Contact = () => {
  return (
    <motion.div 
      className="border-t border-stone-900 pb-20"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1.5 }}
    >
      <h2 className="animated-gradient-text my-10 text-center text-5xl">Get in Touch</h2>
      <div className="text-center tracking-tighter">
          <motion.p 
            className="my-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
              {CONTACT.address}
          </motion.p>
          <motion.p 
            className="my-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
              {CONTACT.phoneNo}
          </motion.p>
          <a href="#" className="border-b animated-stone-gradient-text-fast">
              {CONTACT.email}
          </a>
      </div>
    </motion.div>
  )
}
export default Contact
