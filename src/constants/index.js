const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
    alt: "WiFi Icon",
  },
  {
    id: 2,
    img: "/icons/search.svg",
    alt: "Search Icon",
  },
  {
    id: 3,
    img: "/icons/user.svg",
    alt: "User Icon",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
    alt: "Mode Icon",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Learning & Tools", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const learningJourney = [
  {
    id: 1,
    category: "Project",
    title: "Building This macOS Portfolio",
    description:
      "Created an interactive macOS-inspired portfolio using React, Vite, and GSAP. Implemented smooth window animations with HOC patterns (WindowWrapper), draggable windows with Draggable plugin, state management with Zustand, and pixel-perfect UI mimicking macOS Big Sur design.",
    link: "https://github.com/areddin409/macos_portfolio",
    image: "/icons/apple-logo-black.svg",
  },
  {
    id: 2,
    category: "Course",
    title: "Advanced React Patterns & Performance",
    description:
      "Deep dive into React hooks, context patterns, and optimization techniques",
    link: "https://react.dev",
    image: "/icons/react-icon.svg",
  },
  {
    id: 3,
    category: "Tutorial",
    title: "Mastering GSAP Animations",
    description: "Creating smooth, performant animations with GreenSock",
    link: "https://gsap.com",
    image: "/icons/gsap.svg",
  },
  {
    id: 4,
    category: "Resource",
    title: "TypeScript Best Practices",
    description: "Writing type-safe, maintainable code in modern TypeScript",
    link: "https://www.typescriptlang.org",
    image: "/icons/ts-logo-128.png",
  },
];

const techRecommendations = [
  {
    id: 1,
    category: "Framework",
    title: "Next.js",
    description: "The React framework for production-ready applications",
    link: "https://nextjs.org",
    image: "/icons/nextjs-icon.svg",
  },
  {
    id: 2,
    category: "State Management",
    title: "Zustand",
    description:
      "Lightweight and intuitive state management for React applications",
    link: "https://zustand-demo.pmnd.rs",
    image: "/icons/zustand.svg",
  },
  {
    id: 3,
    category: "Authentication",
    title: "Clerk",
    description: "User management and authentication made easy",
    link: "https://clerk.com",
    image: "/icons/clerk.jpeg",
  },
  {
    id: 4,
    category: "Animation",
    title: "GSAP + React",
    description: "Professional-grade animations with GreenSock in React",
    link: "https://gsap.com/react",
    image: "/icons/gsap.svg",
  },
  {
    id: 5,
    category: "Styling",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    link: "https://tailwindcss.com",
    image: "/icons/tailwindcss.svg",
  },
  {
    id: 6,
    category: "Database",
    title: "MongoDB",
    description: "Flexible NoSQL database for modern applications",
    link: "https://www.mongodb.com",
    image: "/icons/mongodb-bgwhite.svg",
  },
  {
    id: 7,
    category: "ORM",
    title: "Prisma",
    description: "Next-generation ORM for type-safe database access",
    link: "https://www.prisma.io",
    image: "/icons/prisma.svg",
  },
  {
    id: 8,
    category: "Database",
    title: "Sanity CMS",
    description: "Headless CMS for structured content",
    link: "https://www.sanity.io",
    image: "/icons/sanity.svg",
  },
];

const bookmarks = [
  {
    id: 1,
    category: "Documentation",
    title: "MDN Web Docs",
    description: "Comprehensive web development documentation and guides",
    link: "https://developer.mozilla.org",
    image: "/icons/MDN_Web_Docs_logo.svg",
  },
  {
    id: 2,
    category: "Community",
    title: "GitHub",
    description: "Collaborate and learn from the developer community",
    link: "https://github.com",
    image: "/icons/github-black.svg",
  },
  {
    id: 3,
    category: "Tools",
    title: "Can I Use",
    description: "Browser compatibility tables for web technologies",
    link: "https://caniuse.com",
    icon: "Globe",
  },
  {
    id: 4,
    category: "Learning",
    title: "freeCodeCamp",
    description: "Free coding tutorials and certifications",
    link: "https://www.freecodecamp.org",
    image: "/icons/fcc_small.svg",
  },
  {
    id: 5,
    category: "Design",
    title: "Dribbble",
    description: "Design inspiration and creative portfolios",
    link: "https://dribbble.com",
    image: "/icons/dribble.svg",
  },
  {
    id: 6,
    category: "Tools",
    title: "Stack Overflow",
    description: "Q&A community for developers",
    link: "https://stackoverflow.com",
    image: "/icons/stackoverflow.svg",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/JavaScript-Mastery-Pro",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jsmasterypro",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  learningJourney,
  techRecommendations,
  bookmarks,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Nike Ecommerce Website Application",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Nike Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
            "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
            "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
            "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
          ],
        },
        {
          id: 2,
          name: "nike.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "nike.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "AI Resume Analyzer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "AI Resume Analyzer Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
            "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
            "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
            "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
          ],
        },
        {
          id: 2,
          name: "ai-resume-analyzer.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "ai-resume-analyzer.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Food Delivery App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Food Delivery App Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
            "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
            "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
            "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
          ],
        },
        {
          id: 2,
          name: "food-delivery-app.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "food-delivery-app.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/adrian.jpg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/adrian-2.jpg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/adrian-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/adrian.jpg",
      description: [
        "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  contact: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  resume: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  safari: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  photos: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  terminal: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  txtfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
  imgfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
    iconPosition: null,
    isMinimized: false,
    isMaximized: false,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
