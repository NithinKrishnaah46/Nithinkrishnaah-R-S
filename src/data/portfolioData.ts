import { Project, ExperienceItem, EducationItem, Achievement, Certification } from '../types';

export const PERSONAL_INFO = {
  name: 'NITHINKRISHNAAH R S',
  displayRole: 'Full-Stack Developer & AI Solutions Engineer',
  tagline: 'Computer Science Engineering graduate passionate about building scalable, high-performance software systems and deep learning solutions.',
  location: 'Chennai, Tamil Nadu, India',
  phone: '+91 7812884559',
  email: 'nithinseenu24@gmail.com',
  summary:
    'Computer Science Engineering graduate with hands-on experience in Java, React.js, FastAPI, Kotlin, Python, UI/UX, and MySQL. Passionate about building scalable software solutions with strong problem-solving and full-stack development skills.',
  socials: {
    github: 'https://github.com/nithinkrishnaah',
    linkedin: 'https://linkedin.com/in/nithinkrishnaah',
    email: 'mailto:nithinseenu24@gmail.com',
    phone: 'tel:+917812884559'
  }
};

export const SKILLS_DATA = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Java', level: 'Advanced', description: 'Core OOP, multi-threading, collections framework' },
      { name: 'Kotlin', level: 'Proficient', description: 'Android development, coroutines, clean architecture' },
      { name: 'Python', level: 'Advanced', description: 'NumPy, OpenCV, TensorFlow/Keras, automation' },
      { name: 'JavaScript', level: 'Proficient', description: 'ES6+, asynchronous programming, DOM APIs' }
    ]
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'FastAPI', level: 'Proficient', description: 'High-performance async REST microservices, Pydantic' },
      { name: 'Node.js & Express', level: 'Advanced', description: 'RESTful architectures, JWT auth, middleware' },
      { name: 'REST APIs', level: 'Advanced', description: 'API contract design, endpoint optimization, CORS' }
    ]
  },
  {
    category: 'Frontend & UI/UX',
    items: [
      { name: 'React.js', level: 'Advanced', description: 'Hooks, state management, modular component architecture' },
      { name: 'HTML5 & CSS3', level: 'Advanced', description: 'Responsive layouts, semantic DOM, modern animations' },
      { name: 'Bootstrap & Tailwind', level: 'Advanced', description: 'Utility-first styling, grid/flexbox systems' },
      { name: 'Figma & UI Design', level: 'Proficient', description: 'Wireframing, interactive prototyping, user journey mapping' }
    ]
  },
  {
    category: 'Databases & Mobile',
    items: [
      { name: 'MySQL', level: 'Advanced', description: 'Relational schema design, complex joins, indexing' },
      { name: 'MongoDB', level: 'Proficient', description: 'NoSQL document modeling, aggregation pipelines' },
      { name: 'Android Studio & SDK', level: 'Proficient', description: 'Retrofit networking, MVVM, view binding' }
    ]
  },
  {
    category: 'Tools & Core Foundations',
    items: [
      { name: 'Git & GitHub', level: 'Advanced', description: 'Version control, branch workflows, collaborative PRs' },
      { name: 'Data Structures & Algorithms', level: 'Proficient', description: 'Tree/graph traversals, dynamic programming, sorting' },
      { name: 'Object-Oriented Design', level: 'Advanced', description: 'SOLID principles, design patterns, separation of concerns' },
      { name: 'VS Code & Canva', level: 'Advanced', description: 'IDE workflows, developer tooling, presentation assets' }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'freshmorph',
    title: 'FreshMorph – AI Fruit Freshness Detection',
    subtitle: 'Deep Learning Computer Vision System for Automated Agricultural Quality Control',
    category: 'AI & Machine Learning',
    featured: true,
    metrics: '96.4% Classification Accuracy on Multi-Class Fruit Ripeness',
    description:
      'Engineered an intelligent computer vision pipeline powered by Convolutional Neural Networks (CNN) to automatically categorize produce into Fresh, Near Expiry, and Spoiled categories, preventing food waste across supply chains.',
    bullets: [
      'Developed an AI-powered fruit freshness detection system using Convolutional Neural Networks (CNN) to classify fruits as Fresh, Near Expiry, or Spoiled.',
      'Performed image preprocessing, feature extraction, and data augmentation using OpenCV, TensorFlow, and Python to improve prediction accuracy.',
      'Implemented deep learning models with TensorFlow/Keras for image classification and freshness prediction.',
      'Published and presented empirical findings as an IEEE research conference paper (TQCEBT’26).'
    ],
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'CNN', 'Data Augmentation'],
    architectureDetails:
      'Multi-stage pipeline: (1) Preprocessing with OpenCV for RGB color space normalization & noise reduction; (2) Data augmentation with spatial rotations and contrast jitter; (3) Custom deep CNN architecture with depthwise separable convolutions; (4) Softmax multi-class output with confidence bounds.',
    githubUrl: 'https://github.com/nithinkrishnaah/FreshMorph-AI-Freshness-Detection',
    demoUrl: 'https://github.com/nithinkrishnaah/FreshMorph-AI-Freshness-Detection'
  },
  {
    id: 'parkshare',
    title: 'ParkShare – Smart Parking Management',
    subtitle: 'Native Android Application with High-Performance FastAPI Microservices',
    category: 'Mobile & Backend',
    featured: true,
    metrics: 'Sub-150ms Slot Booking Latency with Real-Time Availability',
    description:
      'A real-time urban parking allocation system featuring a native Kotlin Android application seamlessly connected to an asynchronous Python FastAPI backend, offering live reservation tracking and admin control.',
    bullets: [
      'Developed an Android parking application using Kotlin with a FastAPI backend.',
      'Integrated Retrofit-based REST APIs for parking slot booking, user authentication, and availability tracking.',
      'Built an admin dashboard for managing parking reservations and user information.',
      'Engineered relational database models in MySQL for concurrent slot locks and transaction logs.'
    ],
    technologies: ['Kotlin', 'FastAPI', 'MySQL', 'Retrofit', 'Android Studio', 'Python', 'REST APIs'],
    architectureDetails:
      'Client-server architecture: Android client using MVVM with Retrofit2 for HTTP communication, FastAPI backend running on Uvicorn with async SQLAlchemy/MySQL connections, supporting concurrent slot locks and real-time query updates.',
    githubUrl: 'https://github.com/nithinkrishnaah/ParkShare-Smart-Parking',
    demoUrl: 'https://github.com/nithinkrishnaah/ParkShare-Smart-Parking'
  },
  {
    id: 'movie-ticket-booking',
    title: 'Online Movie Ticket Booking Platform',
    subtitle: 'Production-Ready Full-Stack Web Application with Seat Matrix & Auth',
    category: 'Full-Stack Web',
    featured: true,
    metrics: 'End-to-End MERN Stack with Instant Seat Locking System',
    description:
      'A responsive full-stack movie ticket reservation platform enabling cinema goers to browse showtimes, view live interactive seating layouts, securely reserve spots, and inspect personal booking histories.',
    bullets: [
      'Developed a full-stack movie ticket booking application using React.js, Node.js, Express.js, and MongoDB.',
      'Implemented secure user authentication, seat reservation, and booking history management.',
      'Designed responsive user interfaces and developed RESTful APIs for seamless client-server communication.',
      'Created optimized MongoDB schema indexing for rapid cinema hall availability checks.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth', 'CSS3'],
    architectureDetails:
      'Single Page Application (React) communicating via Axios with Express REST endpoints. MongoDB handles movie catalogs, dynamic screening dates, seat statuses (available, held, booked), and order receipt archival with session auth tokens.',
    githubUrl: 'https://github.com/nithinkrishnaah/Movie-Ticket-Booking-System',
    demoUrl: 'https://github.com/nithinkrishnaah/Movie-Ticket-Booking-System'
  },
  {
    id: 'museum-ar',
    title: 'Museum Guidance App Using Augmented Reality',
    subtitle: 'Spatial Exhibit Guidance & Interactive Audio-Visual Experience',
    category: 'AR & UI/UX',
    featured: true,
    metrics: 'Tested with 20+ Historical Artifact Context Modules',
    description:
      'An accessible Augmented Reality museum exploration experience designed to bring cultural relics to life through interactive visual overlays, spatial audio guides, and intuitive visitor journeys.',
    bullets: [
      'Designed and prototyped an Augmented Reality (AR) museum guidance application to provide interactive information about exhibits.',
      'Created intuitive user interfaces and user journeys using Figma, focusing on accessibility and an enhanced visitor experience.',
      'Integrated AI-based concepts to deliver contextual information through interactive visual elements and audio guidance.',
      'Synthesized visitor user research to optimize spatial viewing distances and readability.'
    ],
    technologies: ['Figma', 'UI/UX Design', 'AR Concepts', 'Artificial Intelligence', 'Spatial Audio', 'Prototyping'],
    architectureDetails:
      'Figma design system with comprehensive high-fidelity component libraries, interactive micro-animations, AR camera viewport HUDs, contextual popups, and spatial audio accessibility states mapped to museum physical floor plans.',
    githubUrl: 'https://github.com/nithinkrishnaah/Museum-AR-Guidance',
    demoUrl: 'https://github.com/nithinkrishnaah/Museum-AR-Guidance'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Software Development Intern',
    company: 'Green Heap Enterprise',
    period: 'Sep 2025 – Nov 2025',
    location: 'Chennai, Tamil Nadu',
    highlights: [
      'Developed the Geo Billing application with full end-to-end frontend, backend, and database integration.',
      'Designed high-throughput REST APIs for billing calculations, customer invoice tracking, and real-time inventory management modules.',
      'Performed rigorous manual testing of business-critical workflows, documented defect matrices in Excel, and collaborated closely with senior engineers to verify bug fixes before staging deployment.'
    ],
    technologies: ['REST APIs', 'Database Integration', 'Full-Stack Development', 'QA Testing', 'Excel']
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering – Computer Science and Engineering',
    institution: 'Sathyabama Institute of Science and Technology',
    period: '2022 – 2026',
    cgpa: '7.06 / 10.0',
    location: 'Chennai, Tamil Nadu'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: 'IEEE Research Conference Presentation',
    venue: 'Third International IEEE Conference on Trends in Quantum Computing and Emerging Business Technologies (TQCEBT’26)',
    date: '2026',
    description:
      'Presented the research paper "FreshMorph: An Adaptive Deep Learning Algorithm for Multi-Spectral Freshness Detection in Fruits and Vegetables", demonstrating superior classification metrics using CNN architectures on augmented produce datasets.',
    badge: 'IEEE International Conference',
    doiOrLink: 'TQCEBT’26 Proceedings'
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  { name: 'Infosys Springboard AI', issuer: 'Infosys Springboard', category: 'AI & Data', count: '32 certificates completed' },
  { name: 'Deloitte Data Analytics', issuer: 'Forage', category: 'AI & Data' },
  { name: 'Oracle Cloud Infrastructure (OCI)', issuer: 'Oracle', category: 'Cloud & Architecture' },
  { name: 'AWS Solutions Architecture', issuer: 'Forage', category: 'Cloud & Architecture' },
  { name: 'IBM Python & SQL', issuer: 'IBM', category: 'Software Engineering' },
  { name: 'Full Stack Development', issuer: 'Professional Certification', category: 'Software Engineering' },
  { name: 'Core Java Certification', issuer: 'Professional Certification', category: 'Software Engineering' },
  { name: 'C & C++ Programming', issuer: 'Bharathidhasan University', category: 'Software Engineering' },
  { name: '.NET Fundamentals', issuer: 'Professional Certification', category: 'Software Engineering' },
  { name: 'Introduction to Data Engineering & Big Data', issuer: 'Professional Certification', category: 'AI & Data' },
  { name: 'UI/UX Design Masterclass', issuer: 'Design Academy', category: 'Design' }
];
