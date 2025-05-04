
export interface Course {
  id: string;
  title: string;
  provider: 'Udemy' | 'Alura';
  description: string;
  imageUrl: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  duration: string;
  rating: number;
  reviews: number;
  price: number;
  tags: string[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  specialties: string[];
  yearsOfExperience: number;
  rating: number;
  reviews: number;
  availability: string;
  hourlyRate: number;
  bio: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    provider: 'Udemy',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more.',
    imageUrl: '/placeholder.svg',
    level: 'Beginner',
    category: 'Web Development',
    duration: '40 hours',
    rating: 4.8,
    reviews: 5823,
    price: 89.99,
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
  },
  {
    id: '2',
    title: 'Python for Data Science and Machine Learning',
    provider: 'Udemy',
    description: 'Learn Python for data analysis, visualization, machine learning, and deep learning.',
    imageUrl: '/placeholder.svg',
    level: 'Intermediate',
    category: 'Data Science',
    duration: '30 hours',
    rating: 4.7,
    reviews: 3245,
    price: 94.99,
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy']
  },
  {
    id: '3',
    title: 'Java Masterclass: From Beginner to Expert',
    provider: 'Alura',
    description: 'Comprehensive Java course covering beginner to advanced concepts with practical projects.',
    imageUrl: '/placeholder.svg',
    level: 'Beginner',
    category: 'Programming',
    duration: '52 hours',
    rating: 4.6,
    reviews: 2189,
    price: 79.99,
    tags: ['Java', 'OOP', 'Spring', 'Enterprise Development']
  },
  {
    id: '4',
    title: 'DevOps Engineering: CI/CD with AWS',
    provider: 'Alura',
    description: 'Learn DevOps practices using AWS, Docker, Kubernetes, Jenkins, and more.',
    imageUrl: '/placeholder.svg',
    level: 'Advanced',
    category: 'DevOps',
    duration: '25 hours',
    rating: 4.9,
    reviews: 1256,
    price: 109.99,
    tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    id: '5',
    title: 'UI/UX Design: Creating User-Centered Interfaces',
    provider: 'Udemy',
    description: 'Learn modern UI/UX design principles and tools to create beautiful, user-friendly interfaces.',
    imageUrl: '/placeholder.svg',
    level: 'Intermediate',
    category: 'Design',
    duration: '18 hours',
    rating: 4.7,
    reviews: 2098,
    price: 69.99,
    tags: ['UI', 'UX', 'Figma', 'Design', 'Prototyping']
  },
  {
    id: '6',
    title: 'Cybersecurity Fundamentals',
    provider: 'Alura',
    description: 'Essential cybersecurity concepts, tools, and practices to secure systems and networks.',
    imageUrl: '/placeholder.svg',
    level: 'Beginner',
    category: 'Security',
    duration: '22 hours',
    rating: 4.8,
    reviews: 1576,
    price: 84.99,
    tags: ['Security', 'Networking', 'Ethical Hacking', 'Penetration Testing']
  }
];

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Carlos Santos',
    role: 'Senior Software Engineer',
    company: 'Google',
    imageUrl: '/placeholder.svg',
    specialties: ['Web Development', 'JavaScript', 'React'],
    yearsOfExperience: 12,
    rating: 4.9,
    reviews: 127,
    availability: 'Evenings & Weekends',
    hourlyRate: 150,
    bio: 'Carlos is a software engineer with over a decade of experience building web applications. He specializes in JavaScript and React, and loves helping students master front-end development.'
  },
  {
    id: '2',
    name: 'Ana Oliveira',
    role: 'Data Scientist',
    company: 'Amazon',
    imageUrl: '/placeholder.svg',
    specialties: ['Data Science', 'Python', 'Machine Learning'],
    yearsOfExperience: 8,
    rating: 4.8,
    reviews: 98,
    availability: 'Weekends',
    hourlyRate: 120,
    bio: 'Ana is passionate about data science and machine learning. She has worked on numerous projects involving data analysis and predictive modeling, and enjoys sharing her knowledge with aspiring data scientists.'
  },
  {
    id: '3',
    name: 'Roberto Martins',
    role: 'DevOps Engineer',
    company: 'Microsoft',
    imageUrl: '/placeholder.svg',
    specialties: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
    yearsOfExperience: 10,
    rating: 4.9,
    reviews: 84,
    availability: 'Weekday Evenings',
    hourlyRate: 135,
    bio: 'Roberto specializes in DevOps practices and cloud infrastructure. He has extensive experience with AWS, Docker, and Kubernetes, and has helped many organizations improve their deployment processes.'
  },
  {
    id: '4',
    name: 'Juliana Costa',
    role: 'UX/UI Designer',
    company: 'Apple',
    imageUrl: '/placeholder.svg',
    specialties: ['UX Design', 'UI Design', 'Figma', 'User Research'],
    yearsOfExperience: 7,
    rating: 4.7,
    reviews: 76,
    availability: 'Flexible',
    hourlyRate: 110,
    bio: 'Juliana is a UX/UI designer who focuses on creating intuitive and beautiful user interfaces. She has a background in psychology, which she applies to understand user needs and behaviors.'
  }
];

export const skillCategories = [
  {
    name: 'Programming Languages',
    skills: ['JavaScript', 'Python', 'Java', 'C#', 'PHP', 'TypeScript', 'Ruby', 'Go', 'Swift', 'Kotlin']
  },
  {
    name: 'Web Development',
    skills: ['HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Rails', 'Laravel']
  },
  {
    name: 'Data Science',
    skills: ['Data Analysis', 'Machine Learning', 'Deep Learning', 'NLP', 'Data Visualization', 'Big Data', 'SQL', 'NoSQL', 'TensorFlow', 'PyTorch']
  },
  {
    name: 'DevOps',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Terraform', 'Ansible', 'Monitoring']
  },
  {
    name: 'Design',
    skills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Wireframing', 'User Research', 'Visual Design', 'Design Systems']
  }
];

export const courseRecommendations = {
  'Web Development': ['Complete Web Development Bootcamp', 'JavaScript Mastery: Advanced Concepts', 'React: Building Modern User Interfaces'],
  'Data Science': ['Python for Data Science and Machine Learning', 'Data Analysis with Pandas', 'Machine Learning A-Z'],
  'Programming': ['Java Masterclass: From Beginner to Expert', 'C# Complete Course', 'Go Programming Language'],
  'DevOps': ['DevOps Engineering: CI/CD with AWS', 'Docker and Kubernetes: The Complete Guide', 'AWS Certified Solutions Architect'],
  'Design': ['UI/UX Design: Creating User-Centered Interfaces', 'Figma for UX/UI Designers', 'Web Design Masterclass']
};
