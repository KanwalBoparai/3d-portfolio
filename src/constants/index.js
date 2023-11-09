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
      id: "work",
      title: "Work",
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
      name: "Recipe Website",
      description:
        "A Recipe App built in React, offering intuitive navigation and a user-friendly interface for seamless recipe browsing and management.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "GCP (Firebase)",
          color: "green-text-gradient",
        },
      ],
      source_code_link: "https://github.com/KanwalBoparai/Recipe-website-2023",
    },
    {
      name: "Recipe Website",
      description:
        "A Recipe App built in React, offering intuitive navigation and a user-friendly interface for seamless recipe browsing and management.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "GCP (Firebase)",
          color: "green-text-gradient",
        },
      ],
      source_code_link: "https://github.com/KanwalBoparai/Recipe-website-2023",
    }
  ];

  export { services, technologies, experiences, testimonials ,projects};