
import { 
  BookOpen, 
  UserRound, 
  ClipboardCheck, 
  Lightbulb, 
  Users, 
  BarChart3, 
  Compass, 
  Video 
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: UserRound,
    title: 'Student Profiles',
    description: 'Create detailed profiles with your skills, goals, and learning preferences to personalize your experience.',
    link: '/profile',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    icon: ClipboardCheck,
    title: 'Skill Assessment',
    description: 'Take comprehensive skill assessments to identify strengths and areas for improvement.',
    link: '/assessment',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    icon: Compass,
    title: 'Smart Recommendations',
    description: 'Get personalized course and mentor recommendations based on your goals and skill level.',
    link: '/recommendations',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    icon: BookOpen,
    title: 'Interactive Courses',
    description: 'Access high-quality courses with videos, exercises, and projects from top providers.',
    link: '/courses',
    color: 'bg-green-100 text-green-700'
  },
  {
    icon: UserRound,
    title: 'Expert Mentorship',
    description: 'Connect with industry professionals for personalized guidance and career advice.',
    link: '/mentors',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    icon: Users,
    title: 'Learning Community',
    description: 'Join forums, study groups, and networking events to connect with peers and experts.',
    link: '/community',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and progress reports.',
    link: '/progress',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    icon: Video,
    title: 'Diverse Content',
    description: 'Learn through various content types including courses, videos, and higher education materials.',
    link: '/content',
    color: 'bg-amber-100 text-amber-700'
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Master Tech Skills</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our comprehensive platform combines personalized learning paths, expert mentorship, and a supportive community to accelerate your tech career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="tech-card group">
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-techblue transition-colors">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
