import project1 from "../assets/projects/Mannys_Quest_Cover.png";
import project2 from "../assets/projects/LiftMateLogo.png";
import project3 from "../assets/projects/Roomba.png";
import project4 from "../assets/projects/ps4controller.png";

export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, MySQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, Hydrogen, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and expressing my creativity through visual design.`;

export const EXPERIENCES = [

  
  {
    year: "May 2025 - Present",
    role: "Co-Founder & Software Engineer",
    company: "Sazón Marketing",
    description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB", "Hydrogen", "Shopify", "CSS"],
  },
  {
    year: "January 2025 - Present",
    role: "Lead Web Developer",
    company: "Desi Eats",
    description: `Led the design and development of Desi Eats' comprehensive website, focusing on user experience.
Collaborated with team members to implement features based on user feedback, enhancing functionality.
Managed secure user login systems and database operations, ensuring data integrity.
Developed a calorie tracker and calculator, and prototyped online checkout and food pickup features, improving customer engagement.`,
    technologies: ["HTML", "CSS", "Javascript", "React.js", "Next.js", "mongoDB", "mySQL"],
  },
  {
    year: "August 2024 - Present",
    role: "Resident Assistant",
    company: "Iowa State University Department of Residence",
    description: `Fostered a positive living environment for over 700 residents each year, promoting community spirit and respect for diverse backgrounds. Addressed roommate conflicts and residents’ concerns, promoting open communication and fostering a sense of belonging. Organized engaging social programs to build relationships and encourage resident participation. Mentored new students by providing guidance on academic success and adapting to university life.`,
    technologies: ["Leadership", "Problem-Solving", "Conflict Resolution", "Public Speaking"],
  },
 
];

export const PROJECTS = [
  
  {
    title: "Lift Mate App",
    image: project2,
    description:
      "Built a login system with Firebase so users can sign in and save their workouts securely. Designed the app's screens in Figma after 5 user interviews, making logging workouts faster and easier. Developed features to log exercises, track personal records, and view progress. Collaborated in a small team using Git for version control and peer review.",
    technologies: ["Java", "JavaScript", "Teamwork", "Firebase", "Android Studio"],
  },
  {
    title: "Autonomous Roomba",
    image: project3,
    description:
      "Wrote low-level C to drive motors and read sensors, implementing scanning, mapping, and obstacle avoidance. Demonstrated full autonomous navigation where the robot successfully mapped the area and reached a set goal. Developed a Python GUI for manual control and live mapping, fully integrated with the embedded system code.",
    technologies: ["C", "Git", "Embedded Systems", "Python", "GUI", "Automation"],
  },
  {
    title: "C Programs using a Playstation 4 Controller",
    image: project4,
    description:
      "Turned DUALSHOCK 4 controller inputs (gyro/buttons/sticks) into computer controls in C to support hands-limited use. Developed various programs including: a maze navigated with the controller and a program that enables users to create sentences using the controller as input, which can then be fed into a text-to-speech engine improving accessibility for individuals with speech impediments and limited mobility.",
    technologies: ["C", "Accessibility Programming"],
  },
  {
    title: "Manny's Quest Game",
    image: project1,
    description:
      "Self-taught Python and built a 2D platformer as my first coding project using Pygame.Designed and coded sprite animations, multiple levels, enemy AI, and a functional GUI. Published the game on YouTube, where classmates engaged with it by speedrunning and sharing feedback.",
    technologies: ["Python", "Pygame", "GUI", "UI/UX",],
  },
];

export const CONTACT = {
  address: "221 Beyer CT RM 4801, Ames Iowa, 50012 ",
  phoneNo: "+1 787 234 8861 ",
  email: "ap204898@gmail.com",
};
