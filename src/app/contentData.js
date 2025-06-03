// Shared content data for easy editing
const contentData = {
  about: {
    title: "About Me",
    content: [
      "Hi there! I'm Shane.",
      "I'm a passionate web developer with expertise in modern front-end technologies.",
      "I love creating interactive and immersive web experiences that combine nostalgia with cutting-edge functionality.",
      "My background includes work with React, Next.js, and other modern frameworks, with a special interest in creative UI/UX design.",
      "I love all things about the internet. In my pare time I play the Guitar, listen to music and play games."
    ]
  },
  projects: {
    title: "My Projects",
    items: [
      {
        title: "Portfolio Website",
        description: "The current demonstration. A nostalgic Windows 98 themed portfolio showcasing my skills and projects. Will be updated monthly",
        technologies: ["Next.js", "React", "CSS"],
        icon: "file_html-0.png",
        githubLink: "https://github.com/Mahelaa/Port"
      },
      {
        title: "Esports Data Census",
        description: "My data collection and analysis tool for esports events.This would breakdown data from esports events in Canada, providing insights into player demographics, game statistics, and more.",
        technologies: ["Python", "PowerBI", "SQL"],
        icon: "shopping-0.png",
        githubLink: "https://github.com/Mahelaa/Esports-Canada-Census"
      },
      {
        title: "Weather Application",
        description: "Real-time weather forecasting app with interactive maps and daily/weekly predictions.",
        technologies: ["JavaScript", "API", "CSS"],
        icon: "cloudy-0.png",
        githubLink: "https://github.com/mahelaa/weather-app"
      }
    ]
  },
  skills: {
    title: "My Skills",
    frontend: [
      { name: "HTML5/CSS3", level: 100 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "UI/UX Design", level: 75 }
    ],
    backend: [
      { name: "Python", level: 96},
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "SQL", level: 75 },
      { name: "Firebase", level: 70 },
      { name: "AWS", level: 70 }
    ],
    technologies: [
      { name: "Machine Learning and A.I", level: 92 },
      { name: "Scaling", level: 78 },
      { name: "Cloud Computing", level: 75 },
      { name: "API Development", level:75},
      { name: "Blockchain", level:80 }
    ],
    categories: ["Frontend", "Backend", "Technologies"],
  },
  contact: {
    title: "Contact Me",
    intro: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    methods: [
      { label: "Email Me At", value: "contact@shanes.me", icon: "mailbox-0.png" },
      { label: "Based In", value: "Toronto, CA", icon: "earth-0.png" }
    ],
    social: {
      title: "Connect With Me",
      icons: [
        { name: "Twitter", icon: "msn_messenger-0.png" },
        { name: "LinkedIn",value: "www.linkedin.com/8bits", icon: "internet_connection_wiz-4.png" },
        { name: "GitHub",value: "www.github.com/mahelaa", icon: "html-0.png" }
      ]
    }
  },
  resume: {
    title: "Download Resume",
    filename: "Resume_Shane.pdf",
    fileDetails: [
      "File type: Adobe PDF Document",
      "Size: 1.2 MB",
      "From: career.shane.dev"
    ]
  },
  // Welcome/Intro modal content
  welcome: {
    title: "Welcome to My Portfolio Website",
    icon: "computer-4.png",
    heading: "Welcome to my Windows 98 Portfolio!",
    description: [
      "I like making cool websites. I plan on changing my design every month. Check back in and see what's new!",
      "This interactive portfolio is designed to mimic the nostalgic Windows 98 interface and to showcase my love of old school design."
    ],
    instructions: [
      "Click on the desktop icons to explore different sections of my portfolio",
      "Use the Start menu at the bottom left to access additional features"
    ],
    footer: "Hint: There are a few hidden easter eggs throughout the site for you to discover ;)",
    buttonText: "Got it!"
  },

  // Desktop icons configuration
  desktopIcons: [
    { name: 'About Me', icon: 'user-0.png', action: 'about' },
    { name: 'Projects', icon: 'directory_closed-4.png', action: 'projects' },
    { name: 'Skills', icon: 'application_lightning-0.png', action: 'skills' },
    { name: 'Contact', icon: 'outlook_express-4.png', action: 'contact' },
    { name: 'Resume', icon: 'notepad-1.png', action: 'resume' },
    { name: 'Internet Explorer', icon: 'internet_explorer-0.png', action: 'ie' },
    { name: 'Recycle Bin', icon: 'recycle_bin_empty-4.png', action: null }
  ],

  // Loading and start screen content
  loading: {
    text: "LOADING...",
    nintendoText: "NINTENDO",
    portfolioTitle: "PORTFOLIO",
    startText: "PRESS START",
    startButtonText: "START"
  },

  // Gameboy content for mobile
  gameboy: {
    nintendo: "NINTENDO",
    trademark: "TM",
    model: "GAME BOY",
    powerText: "POWER",
    sections: {
      about: ["Brief introduction", "Professional background"],
      projects: ["Project 1", "Project 2", "Project 3"],
      skills: ["JavaScript", "React", "Node.js"],
      contact: ["Email: contact@example.com", "Phone: +1 234 567 890"],
      resume: ["Download my resume", "Education: Computer Science", "Experience: 5+ years"]
    }
  },

  // Error windows content
  errorWindows: {
    title: "System Error",
    icon: "warning-0.png",
    errorIcon: "messagebox_critical-0.png",
    messages: [
      {
        title: "ERROR",
        text: "Windows error occurred",
        code: "ERROR CODE: 0x0000000A"
      },
      {
        title: "FATAL EXCEPTION",
        text: "Windows has encountered an error.",
        code: "ERROR CODE: 0x0000000A",
        technical: ["Technical information:", "*** STOP: 0x0000000A"]
      }
    ],
    buttons: ["OK", "Cancel", "Ignore", "Close", "Retry"]
  },

  // Media Player content
  mediaPlayer: {
    title: "Windows Media Player",
    icon: "media_player-0.png",
    menuItems: ["File", "View", "Play", "Tools", "Help"],
    currentTrack: "Portfolio Theme",
    playlist: [
      { title: "Portfolio Theme", duration: "2:15" },
      { title: "Win98 Nostalgia", duration: "3:42" },
      { title: "Error Sound", duration: "0:05" }
    ],
    playingText: "Playing",
    readyText: "Ready",
    audioInfo: "44kHz, 16bit"
  },

  // Paint application content
  paint: {
    title: "untitled - Paint",
    icon: "paint-0.png",
    menuItems: ["File", "Edit", "View", "Image", "Colors", "Help"],
    tools: [
      { name: "Free-Form Select", icon: "select-free" },
      { name: "Select", icon: "select-rect" },
      { name: "Eraser/Color Eraser", icon: "eraser" },
      { name: "Fill With Color", icon: "fill" },
      { name: "Pick Color", icon: "picker" },
      { name: "Magnifier", icon: "magnifier" },
      { name: "Pencil", icon: "pencil" },
      { name: "Brush", icon: "brush" },
      { name: "Airbrush", icon: "airbrush" },
      { name: "Text", icon: "text" },
      { name: "Line", icon: "line" },
      { name: "Curve", icon: "curve" },
      { name: "Rectangle", icon: "rectangle" },
      { name: "Polygon", icon: "polygon" },
      { name: "Ellipse", icon: "ellipse" },
      { name: "Rounded Rectangle", icon: "rounded-rect" }
    ],
    statusText: "For Help, click Help Topics on the Help Menu.",
    dimensions: "400 x 300px",
    colorsText: "Colors",
    profileImage: "/Pics/profile.png",
    profileAlt: "MS Paint Profile"
  },

  // Internet Explorer content
  internetExplorer: {
    title: "Microsoft Internet Explorer",
    icon: "internet_explorer-0.png",
    menuItems: ["File", "Edit", "View", "Go", "Favorites", "Help"],
    toolbarButtons: [
      { name: "Back", icon: "back-0.png" },
      { name: "Forward", icon: "forward-0.png" },
      { name: "Stop", icon: "stop-0.png" },
      { name: "Refresh", icon: "refresh-0.png" },
      { name: "Home", icon: "home-0.png" }
    ],
    addressLabel: "Address",
    defaultUrl: "about:blank",
    statusLeft: "Done",
    statusRight: "Internet zone"
  },

  // Taskbar content
  taskbar: {
    startButton: {
      icon: "windows-0.png",
      text: "Start"
    },
    statusItems: [
      {
        icon: "world-0.png",
        text: `© ${new Date().getFullYear()} Made by @Shane`
      }
    ]
  }
};

export default contentData;
