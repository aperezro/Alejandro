import logo from "../assets/alejandroLogo.svg";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img 
          src={logo} 
          className="mx-2" 
          width={100} 
          height={50} 
          alt="Alejandro Perez Logo" 
        />
      </div>

      <div className="m-8 flex items-center justify-center gap-4 text-4xl">
        <a 
          href="https://www.linkedin.com/in/aperezro/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
          className="inline-flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] focus-visible:scale-110"
        >
          <FaLinkedin />
        </a>

        <a 
          href="https://github.com/aperezro/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub"
          className="inline-flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] focus-visible:scale-110"
        >
          <FaGithub />
        </a>






      </div>
    </nav>
  );
};

export default Navbar;
