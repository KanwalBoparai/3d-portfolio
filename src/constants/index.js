import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    caa,
    baajj,
    rh,
    kartar,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "education",
      title: "Education",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "skills",
      title: "Skills",
    },
    {
      id: "leadership",
      title: "Leadership",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "additional",
      title: "Additional",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Information Technology Analyst",
      icon: creator,
    },
    {
      title: "Administrative Assistant",
      icon: web,
    },
    {
      title: "Data Analyst",
      icon: mobile,
    },
    {
      title: "Shopify Developer",
      icon: backend,
    }
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Software Engineering Intern",
      company_name: "Modern Automotive Limited",
      icon: web, // You may want to replace this with a proper company logo
      iconBg: "#ffffff",
      date: "Oct 2024 - Dec 2024",
      points: [
        "Built features for a full-stack web application for hybrid vehicle control dashboard using React (TypeScript) and Node.js, implementing RESTful APIs and JWT authentication.",
        "Created automated tests with Jest and React Testing Library to improve code reliability and catch bugs before production.",
        "Integrated third-party APIs for our Node.js backend; providing real-time vehicle data synchronization, enhancing the user monitoring experience.",
        "Implemented a CI/CD pipeline using GitHub Actions that automated builds, testing, and deployments, reducing deployment time by 40%.",
        "Went from using a local machine to using codespaces to make sure the development process is smooth.",
        "Participated in Agile development with two-week sprints, daily stand-ups, and weekly retrospectives.",
        "Collaborated with a designer and product managers to meet project goals and deadlines.",
      ],
    },
    {
      title: "Information Technology Analyst",
      company_name: "CAA (The Canadian Automobile Association)",
      icon: caa,
      iconBg: "#E6DEDD",
      date: "Sept 2023 - Dec 2023",
      points: [
        "Developed and implemented mathematical algorithms and statistical models as part of the Geo-Temporal Gen 2 project, contributing to data analysis and predictive insights generation.",
        "Utilized machine-learning algorithms to process and analyze large datasets, enhancing data-driven decision-making and project outcomes.",
        "Integrated diverse statistical models to facilitate in-depth data analysis, improving the accuracy and relevance of insights derived from complex data sets.",
        "Collaborated with a team to optimize the performance and accuracy of machine learning algorithms and statistical models, demonstrating strong teamwork and problem-solving skills.",
        "Performed extensive research on weather API’s",
        "Proficient in polyline encoding, with expertise in data compression and geographic data representation, particularly in web mapping and navigation systems. Skilled in decoding polyline strings for location-based services and experienced with the Google Maps Polyline Encoding Algorithm. Able to optimize polyline encoding for efficient data transfer and enhance user experience in mobile and web applications.",
      ],
    },
    {
      title: "Administrative Assistant",
      company_name: "RS Khalsa High School",
      icon: rh,
      iconBg: "#ffffff",
      date: "Sept 2021 - Dec 2021",
      points: [
        "Provided administrative support, managing calendars, scheduling appointments, and coordinating meetings.",
        "Managed communication channels, including correspondence, phone calls, emails, by responding to inquiries and routing messages.",
        "Maintained accurate and up-to-date records and files, ensuring compliance with school policies and procedures.",
        "Demonstrated strong organizational skills, attention to detail, and the ability to multitask effectively in a fast-paced environment.",
      ],
    },
    {
      title: "Data Analyst Intern",
      company_name: "Kartar Road Lines",
      icon: kartar,
      iconBg: "#ffffff",
      date: "June 2022 - Dec 2022",
      points: [
        "Worked with a transportation company that managed import and export of goods in India.",
        "Automated data collection and organization using Excel and VBA, replacing manual processes.",
        "Analyzed data patterns and trends, using SQL, to provide insights for informed business decision-making.",
        "Contributed to improving overall efficiency and accuracy of data management processes.",
      ],
    },
    {
      title: "Shopify Developer",
      company_name: "BAAJJ.com",
      icon: baajj,
      iconBg: "#000000",
      date: "Dec 2022 - Current",
      points: [
        "Co-founded and managed a drop-shipping e-commerce enterprise, utilizing third-party apps such as CJ Drop shipping and D-Sers, to simplify the order fulfillment process.",
        "Developed and implemented custom themes using Shopify's theme templating language, Liquid, along with HTML, CSS, JavaScript, and JSON",
        "Designed prototypes and front-end of the store with user-friendly interfaces and compelling product descriptions using Figma.",
        "Implemented and managed various marketing strategies to increase sales and improve customer engagement.",
        "Utilized data analytics tools (Google Analytics and Facebook Insights) to track website traffic and customer behavior, improving the overall performance of the business.",
        "Negotiated favorable terms with suppliers, trained team of customer service reps & maintained knowledge of industry trends for continual business improvement.",
      ],
    }
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Kanwal proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "3D-Portfolio",
      description:
        "Developed a portfolio website using Three.js, React Fiber-Three, and 3D Canvas geometry. Implemented a modular design approach with smaller components for navigation, contact, projects etc. Utilized Framer Motion for object animations and Higher-Order Components to display all modular elements. Used Tailwind CSS for styling and created media and designs with Adobe Photoshop.",
      tags: [
        {
          name: "three.js",
          color: "blue-text-gradient",
        },
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "framer-motion",
          color: "pink-text-gradient",
        },
        {
          name: "tailwind",
          color: "orange-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "http://localhost:5174/3d-portfolio",
      live_demo_link: "http://localhost:5174/3d-portfolio",
    },
    {
      name: "Recipe Book",
      description:
        "Designed and implemented a design recipe web application with React.js, featuring search functionality. Implemented features for adding favourite recipes, list recipes in a table and a customizable theme feature.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/KanwalBoparai/Recipe-website-2023",
    },
    {
      name: "Todo List with React.js",
      description:
        "Built an interactive task management app with dynamic input fields and checkbox synchronization. Leveraged useCallback for optimized state management and ensured smooth UI updates.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "hooks",
          color: "orange-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/KanwalBoparai",
    }
  ];

  export { services, technologies, experiences, testimonials ,projects};
