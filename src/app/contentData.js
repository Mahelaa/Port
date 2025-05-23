// Shared content data for consistency across mobile and desktop
const contentData = {
  about: {
    title: "About Me",
    content: [
      "Hi there! I'm Shane.",
      "I'm a passionate web developer with expertise in modern front-end technologies.",
      "I love creating interactive and immersive web experiences that combine nostalgia with cutting-edge functionality.",
      "My background includes work with React, Next.js, and other modern frameworks, with a special interest in creative UI/UX design.",
      "When I'm not coding, you can find me exploring new technologies, playing retro games, or hiking outdoors."
    ]
  },
  projects: {
    title: "My Projects",
    items: [
      {
        title: "Portfolio Website",
        description: "A creative portfolio built with Next.js featuring interactive retro UI elements and modern web technologies.",
        technologies: ["Next.js", "React", "CSS"],
        icon: "file_html-0.png"
      },
      {
        title: "E-commerce Platform",
        description: "Full-featured online store with product catalog, shopping cart, and secure checkout functionality.",
        technologies: ["React", "Node.js", "MongoDB"],
        icon: "shopping-0.png"
      },
      {
        title: "Weather Application",
        description: "Real-time weather forecasting app with interactive maps and daily/weekly predictions.",
        technologies: ["JavaScript", "API", "CSS"],
        icon: "cloudy-0.png"
      }
    ]
  },
  skills: {
    title: "My Skills",
    frontend: [
      { name: "HTML5/CSS3", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "UI/UX Design", level: 75 }
    ],
    backend: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQL", level: 75 },
      { name: "GraphQL", level: 70 }
    ],
    tools: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 75 },
      { name: "Jest", level: 85 },
      { name: "Webpack", level: 80 }
    ],
    categories: ["Frontend", "Backend", "Tools"]
  },
  contact: {
    title: "Contact Me",
    intro: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    methods: [
      { label: "Email Me At", value: "shane@example.com", icon: "mailbox-0.png" },
      { label: "Based In", value: "San Francisco, CA", icon: "earth-0.png" },
      { label: "Call Me", value: "(123) 456-7890", icon: "phone-2.png" }
    ],
    social: {
      title: "Connect With Me",
      icons: [
        { name: "Twitter", icon: "msn_messenger-0.png" },
        { name: "LinkedIn", icon: "internet_connection_wiz-4.png" },
        { name: "GitHub", icon: "html-0.png" }
      ]
    }
  },
  resume: {
    title: "Download Resume",
    filename: "Resume_Shane_Developer.pdf",
    fileDetails: [
      "File type: Adobe PDF Document",
      "Size: 1.2 MB",
      "From: career.shane.dev"
    ]
  }
};

export default contentData;
