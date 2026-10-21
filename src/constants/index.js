import project1 from "../assets/projects/Mannys_Quest_Cover.png";
import project2 from "../assets/projects/LiftMateLogo.png";
import project3 from "../assets/projects/Roomba.png";
import project4 from "../assets/projects/ps4controller.png";
import project5 from "../assets/projects/CyCourse.png";
import reignition from "../assets/projects/Reignition.png";
import unleashed from "../assets/projects/Unleashed.jpg";
import dusklight from "../assets/projects/DuskLight.png";
import club1 from "../assets/clubs/PRSA.png";
import club3 from "../assets/clubs/ALD.png";
import club4 from "../assets/clubs/lead.png";
import job1 from "../assets/jobs/deere.png";
import job2 from "../assets/jobs/sazon.png";
import job3 from "../assets/jobs/desi_logo.png";
import job4 from "../assets/jobs/deptresidence.png";

export const HERO_CONTENT = `I build customer-facing software at John Deere and co-founded Sazón Marketing. My work spans full-stack web applications and native iOS game ports, including bringing Sonic Unleashed to iPhone and iPad with Metal rendering and touch controls.`;

export const ABOUT_TEXT = `I’m a software engineer with experience in enterprise applications, e-commerce, and native game development. At John Deere, I work on Channel UX applications; at Sazón Marketing, I build websites and integrations for businesses. Outside of web development, I enjoy solving platform and graphics challenges to bring desktop games to iPhone and iPad.`;

export const EXPERIENCES = [

   {
    year: "November 2025 - Present",
    role: "Channel UX Software Engineer",
    company: "John Deere",
    image: job1,
    description: `Contribute to the development and maintenance of customer-facing Channel UX applications used across John Deere's dealer and enterprise platforms. Collaborate with UX designers, product managers, and senior engineers to
implement user-centered features and workflows. Develop and debug production code in a large-scale enterprise codebase, following internal engineering standards and review processes`,
    technologies: ["Javascript", "React.js", "Playwright", "Docker", "TypeScript", "AWS", "Datadog"],
  },
  {
    year: "May 2025 - Present",
    role: "Co-Founder & Software Engineer",
    company: "Sazón Marketing",
    image: job2,
    description: `Co-founded Sazón Marketing, specializing in website consulting and management. Rebuilt e-commerce site for Cucara Macara using React/Hydrogen, improving SEO and increasing online traffic by 35%. Integrated inventory APIs for Blue Diamond Luxury, enabling $3M of inventory to be synced and sold online.`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB", "Hydrogen", "Shopify", "CSS"],
  },
  {
    year: "January 2025 - Present",
    role: "Lead Web Developer",
    company: "Desi Eats",
    image: job3,
    description: `Led the design and development of Desi Eats' comprehensive website, focusing on user experience.
Collaborated with team members to implement features based on user feedback, enhancing functionality.
Managed secure user login systems and database operations, ensuring data integrity.
Developed a calorie tracker and calculator, and prototyped online checkout and food pickup features, improving customer engagement.`,
    technologies: ["HTML", "CSS", "Javascript", "React.js", "Next.js", "mongoDB", "mySQL"],
  },
  {
    year: "August 2024 - August 2026",
    role: "Resident Assistant",
    company: "Iowa State University Department of Residence",
    image: job4,
    description: `Fostered a positive living environment for over 700 residents each year, promoting community spirit and respect for diverse backgrounds. Led a floor of 56 students. Addressed roommate conflicts and residents' concerns, promoting open communication and fostering a sense of belonging. Organized engaging social programs to build relationships and encourage resident participation. Mentored new students by providing guidance on academic success and adapting to university life.`,
    technologies: ["Leadership", "Problem-Solving", "Conflict Resolution", "Public Speaking"],
  },
 
];

export const PROJECTS = [
  {
    slug: "project-reignition",
    title: "Project Reignition",
    image: reignition,
    footageUrl: "https://lnkd.in/p/gy4gcpfi",
    downloadUrl: "",
    description: "Ported Project Reignition, a Godot 4.7 .NET game, to iPhone and iPad. Added touch controls, device-specific full-screen layouts, safe-area handling, and mobile-friendly graphics. Fixed gameplay and UI issues, including Sonic's eye alignment, the spinning jump effect, reward-screen buttons, and menu positioning. Resolved an iOS native scene-loading issue that could stall Rampage missions, added recovery options, and validated the signed build on real iPhone and iPad hardware across missions, objectives, countdowns, and touch movement.",
    technologies: ["Godot", ".NET", "C#", "Xcode"],
  },
  {
    slug: "unleashed-recompiled",
    title: "Unleashed Recompiled",
    image: unleashed,
    footageUrl: "",
    description: "Ported Unleashed Recompiled to iOS and iPadOS as a native, sideloadable ARM64 application. Reworked the iOS application lifecycle, preserved the desktop installer workflow for selecting user-provided game, update, and DLC files, and resolved startup crashes related to signing, memory mapping, graphics initialization, and platform assumptions. Replaced the Vulkan compatibility path with a native Metal renderer, translating SPIR-V shaders to Metal Shading Language and building native pipelines, resources, and presentation commands. Fixed black screens, inverted rendering, aspect-ratio issues, and background-resume freezes. Added responsive Xbox 360-inspired touch controls and validated gameplay, audio, rendering, and lifecycle transitions on real iPhone and iPad hardware.",
    technologies: ["Xcode", "C++", "Metal", "Vulkan"],
  },
  {
    slug: "dusklight",
    title: "Dusklight",
    image: dusklight,
    footageUrl: "https://lnkd.in/p/g9F5nX3z",
    description: "Developed GameCube-style multitouch controls for Dusklight's existing iOS build, then adapted the implementation into a shared module following maintainer feedback. Integrated controller selection, persisted stick sensitivity, PAD input conversion, and an iOS gyro aiming extension. Documented device testing, texture-pack experiments, and startup debugging, including the limits of the available validation.",
    technologies: ["C++", "SDL3", "ImGui", "CMake", "iOS"],
  },
   {
    slug: "cycourse",
    title: "CyCourse App",
    image: project5,
    description:
      "Collaborated in a team of four to develop Cycourse a full-stack android application that helps Iowa State Students create class schedules, traverse campus, view professor reviews, and socialize with other students. Developed the front-end using Java and XML in Android Studio, implementing user-friendly interfaces and seamless navigation. Built the back-end with Postman and Springboot, creating RESTful APIs to handle user authentication, data storage, and retrieval. Utilized Websockets for real-time communication and notifications.",
    technologies: ["Java", "JavaScript", "Teamwork", "Postman", "Android Studio"],
  },
  {
    slug: "lift-mate",
    title: "Lift Mate App",
    image: project2,
    description:
      "Built a login system with Firebase so users can sign in and save their workouts securely. Designed the app's screens in Figma after 5 user interviews, making logging workouts faster and easier. Developed features to log exercises, track personal records, and view progress. Collaborated in a small team using Git for version control and peer review.",
    technologies: ["Java", "JavaScript", "Teamwork", "Firebase", "Android Studio"],
  },
  {
    slug: "autonomous-roomba",
    title: "Autonomous Roomba",
    footageUrl: "https://youtu.be/Sz_m1Ht0rnQ",
    image: project3,
    description:
      "Wrote low-level C to drive motors and read sensors, implementing scanning, mapping, and obstacle avoidance. Demonstrated full autonomous navigation where the robot successfully mapped the area and reached a set goal. Developed a Python GUI for manual control and live mapping, fully integrated with the embedded system code.",
    technologies: ["C", "Git", "Embedded Systems", "Python", "GUI", "Automation"],
  },
  {
    slug: "ps4-accessibility",
    title: "C Programs using a Playstation 4 Controller",
    image: project4,
    description:
      "Turned DUALSHOCK 4 controller inputs (gyro/buttons/sticks) into computer controls in C to support hands-limited use. Developed various programs including: a maze navigated with the controller and a program that enables users to create sentences using the controller as input, which can then be fed into a text-to-speech engine improving accessibility for individuals with speech impediments and limited mobility.",
    technologies: ["C", "Accessibility Programming"],
  },
  {
    slug: "mannys-quest",
    title: "Manny's Quest Game",
    footageUrl: "https://youtu.be/Tbj9qGEH-MU",
    image: project1,
    description:
      "Self-taught Python and built a 2D platformer as my first coding project using Pygame. Designed and coded sprite animations, multiple levels, enemy AI, and a functional GUI. Published the game on YouTube, where classmates engaged with it by speedrunning and sharing feedback.",
    technologies: ["Python", "Pygame", "GUI", "UI/UX",],
  },
];

export const CLUBS = [
  {
    title: "Puerto Rican Student Association (PRSA)",
    image: club1,
    description:
      "Produce and edit professional Instagram Reels and photo/video content; grew account reach by [X%] and followers by [X] in [Y] months. Plan and execute a bi-weekly meeting cadence; coordinate agendas, speakers, and logistics to keep average attendance at [X–Y] members. Co-lead event planning (welcome mixers, cultural nights, service drives), managing timelines, budgets of [$X], and cross-org partnerships. Represent PRSA at campus events and with university offices to secure space, funding, and visibility.",
    technologies: ["Leadership", "Event Planning", "Cultural Awareness", "Community Building", "Engagement"],
  },
  
  {
    title: "Alpha Lambda Delta Honor Society",
    image: club3,
    description:
      "Recognized academic excellence among first-year students and promoted scholarship through various initiatives.",
    technologies: ["Leadership", "Event Planning", "Cultural Awareness", "Community Building"],
  },
  {
    title: "LEAD Leadership through Engineering Academic Diversity",
    image: club4,
    description:
      "Recognized academic excellence among first-year students and promoted scholarship through various initiatives.",
    technologies: ["Leadership", "Event Planning", "Cultural Awareness", "Community Building"],
  },
];

export const CONTACT = {
  address: "122 Hayward Ave 508, Ames Iowa, 50014",
  phoneNo: "+1 787 234 8861 ",
  email: "ap204898@gmail.com",
};

// Project pages currently ready to share. Other projects remain in the homepage list.
export const PROJECT_PAGES = PROJECTS.filter(project =>
  ['dusklight', 'project-reignition', 'unleashed-recompiled'].includes(project.slug)
);
export const projectPageTitle = project => project.slug === 'unleashed-recompiled' ? 'Sonic Unleashed' : project.title;
