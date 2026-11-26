import type { TranslationDictionary } from './types';

export const enUS: TranslationDictionary = {
  meta: {
    title: 'Felipe Soares · Senior Frontend Engineer',
    description:
      'Felipe Soares — Senior Frontend Engineer with 8+ years building fast, scalable and accessible web applications with React, TypeScript, microfrontends and design systems.',
  },
  a11y: {
    skipToContent: 'Skip to main content',
    primaryNav: 'Primary',
    mobileNav: 'Mobile',
    home: 'Felipe Soares, back to top',
    language: 'Language',
    languageNames: { 'en-US': 'EN — English', 'pt-BR': 'PT — Português (Brasil)' },
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    opensInNewTab: '(opens in a new tab)',
    resumeDownload: 'Resume — download PDF',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
    letsTalk: "Let's talk",
    resume: 'Resume',
  },
  hero: {
    badge: (years) => `${years}+ Years of Experience`,
    titleLead: 'Senior Frontend',
    titleAccent: 'Engineer',
    subtitle:
      'I build fast, scalable and accessible web applications — from microfrontends and design systems to headless CMS platforms and AI-assisted workflows.',
    ctaPrimary: 'Explore my work',
  },
  about: {
    eyebrow: 'About me',
    titleLead: 'Turning complex problems into',
    titleAccent: 'simple solutions.',
    paragraphs: [
      "I'm a Senior Frontend Engineer with 8+ years of experience building web applications with React, TypeScript and Remix. I design and evolve microfrontend architectures, monorepos, design systems and headless CMS platforms like Sanity.",
      "I've shipped products across gaming platforms, admin and moderation tools, localization systems and AI-assisted workflows with MCP — working with international, cross-functional teams from first design to production.",
    ],
    pillarsLabel: 'How I work',
    pillars: {
      performance: 'Performance Focused',
      architecture: 'Scalable Architecture',
      collaboration: 'Collaborative Mindset',
      'user-centric': 'User-Centric Design',
    },
  },
  projects: {
    eyebrow: 'Selected projects',
    title: 'My recent work',
    viewAll: 'View all projects',
    comingSoon: 'Link coming soon',
    techLabel: 'Technologies',
    items: {
      'game-ops-platform': {
        title: 'Game Platform & Ops Tooling',
        description:
          'Central operations platform for in-game events, store catalogs and game content, with shared auth and RBAC across teams.',
        imageAlt: 'Screenshot of the game operations platform',
      },
      'analytics-moderation': {
        title: 'Analytics & Moderation Suite',
        description: 'Creator analytics dashboards and video moderation workflows with real-time processing status.',
        imageAlt: 'Screenshot of the analytics and moderation dashboards',
      },
      'web-game-lab': {
        title: 'Web Game & Interactive Lab',
        description: 'Playable web game prototypes shipped in weekly cycles with PixiJS and AI-assisted workflows.',
        imageAlt: 'Screenshot of a PixiJS web game prototype',
      },
    },
  },
  experience: {
    eyebrow: 'Career journey',
    title: 'Experience & Education',
    highlight: (commits, repos) => `${commits} commits across ${repos} repositories at Fortis Games`,
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    keyTechnologies: 'Key technologies',
    roles: {
      'fortis-se2': {
        title: 'Software Engineer II',
        location: 'Remote',
        achievements: [
          "Led the frontend implementation of Fortis Games' corporate website, starting with technology evaluations and Proofs of Concept (POCs) using Sanity and Builder.io. Served as the sole frontend developer for approximately 80% of the development process.",
          'Architected the Sanity dataset and content structure, creating dynamic components to render different document types. The platform supported multiple languages, geolocation-based content, Greenhouse job listings, company articles, and dedicated pages for individual games.',
          "Enhanced the company's central game content and operations platform, introducing functionality for managing in-game events, store items, and game content catalogs.",
          'Extended Model Context Protocol (MCP) tooling integrated with Claude Code, enabling QA engineers and Producers to query game information by game ID, content, or package, including availability, descriptions, and item pricing.',
          'Established an extensible microfrontend platform where independent teams could integrate their own applications while leveraging shared authentication, Role-Based Access Control (RBAC), and reusable component libraries published as npm packages.',
          "Automated the game's third-party license documentation workflow through a custom skill that processed SBOM files generated by Unibom, classified dependencies against internal policies, flagged items requiring legal review, and prepared content for publication in Sanity.",
          'Joined an internal game incubation initiative, prototyping web games with PixiJS and AI-assisted development workflows, delivering playable builds at the end of each weekly development cycle.',
        ],
      },
      'fortis-se1': {
        title: 'Software Engineer I',
        location: 'Remote',
        achievements: [
          'Expanded the Magic: Puzzle Quest administrative support platform with features for scheduling in-game events, composing player messages, handling support requests, reviewing player history, verifying reward eligibility, and managing cheating-related flags.',
          'Delivered the web frontend for a game that already had a mobile client built with Unity, using a monorepo architecture with Remix and React. The application enabled gameplay and data exchange with the mobile version, alongside dedicated pages for achievements, levels, and unlockable reaction emojis that players could equip in decks.',
          'Designed an administrative video moderation platform for reviewing player-uploaded and reported videos. The interface consolidated automated validation results, processing statuses, and player reports, allowing moderators to review comments, approve or remove videos, and rerun validation processes when processing failures occurred.',
        ],
      },
      'oktagon-fe': {
        title: 'Front-End Developer',
        location: 'Londrina, Paraná, Brazil',
        achievements: [
          'Enhanced PopBase, an interactive platform that helped content creators gamify audience engagement, by introducing URL-based video imports, video editing capabilities such as trimming and subtitles, and interactive elements displayed during playback.',
          'Designed analytical dashboards and data visualizations for content creators, presenting metrics such as video views, user interactions, and player spending.',
          'Streamlined the Magic: Puzzle Quest player support application by introducing filtering capabilities and reorganizing player information to improve data visibility and simplify support workflows.',
          'Orchestrated the frontend modules of a microfrontend architecture, including dashboards with charts generated by Python services and a game localization platform for external translators. The system featured role-specific interfaces, translation key validation, similarity-based search and ranking, and WebSocket communication.',
        ],
      },
      'yankton-fs': {
        title: 'Full-Stack Developer',
        location: 'Cornélio Procópio, Paraná, Brazil',
        achievements: [
          'Contributed to an employee time-tracking system, including worked-hours calculations and overtime balance management.',
          'Helped launch a mobile application for a barbershop using React Native, allowing customers to browse service prices and schedule appointments.',
          'Maintained and extended a legacy Human Resources management system built with C# and SQL, while using MongoDB as the primary database in other projects.',
        ],
      },
    },
    education: {
      heading: 'Education',
      degree: 'Technology Degree in Systems Analysis and Development',
      institution: 'Federal University of Technology – Paraná (UTFPR)',
      location: 'Cornélio Procópio, Paraná, Brazil',
      courseworkLabel: 'Key coursework',
      coursework: [
        'Software Engineering and Development Methodologies',
        'Database Management Systems',
        'Web Application Development',
        'Computer Networks and Software Architecture',
      ],
      extensionTitle: 'Extension project — Educational Robotics and Programming for Children',
      extensionPoints: [
        'Taught programming logic to children from public schools through LEGO educational robotics.',
        'Supported hands-on activities using LEGO robots to introduce programming concepts and computational thinking.',
        "Helped integrate robotics and programming into activities that supported children's learning across school subjects.",
      ],
    },
  },
  skills: {
    eyebrow: 'Technical expertise',
    title: 'Technologies & Skills',
    description: 'The tools I use every day, plus the wider stack from eight years of shipping products.',
    tablistLabel: 'Skill categories',
    categories: {
      core: 'Core',
      frontend: 'Frontend & State',
      architecture: 'Architecture & CMS',
      'backend-ai': 'Backend, AI & Games',
      'testing-devops': 'Testing & DevOps',
    },
    softSkillsTitle: 'Soft skills',
    softSkills: {
      collaboration: 'Cross-functional collaboration',
      international: 'International teams',
      communication: 'Technical communication',
      'problem-solving': 'Problem-solving and adaptability',
      'code-reviews': 'Technical discussions and code reviews',
      'knowledge-sharing': 'Knowledge sharing',
    },
  },
  contact: {
    eyebrow: "Let's connect",
    title: 'Have a project in mind?',
    description:
      "I'm always open to new opportunities, technical collaborations, or just a good chat about tech and games.",
    cta: 'Get in touch',
    copyEmail: 'Copy email address',
    copied: 'Email address copied to clipboard.',
    copyFailed: (email) => `Couldn't copy automatically. The email is ${email}.`,
    socialLabel: 'Find me online',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    email: 'Send an email',
  },
  footer: {
    role: 'Senior Frontend Engineer',
    tagline: ['Build', 'Improve', 'Innovate'],
  },
};
