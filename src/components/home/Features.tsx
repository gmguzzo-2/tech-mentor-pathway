
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
import { useTranslations } from "@/hooks/useTranslations";

const Features = () => {
  const { t } = useTranslations();
  
  const features = [
    {
      icon: UserRound,
      title: t('home.features.items.0.title'),
      description: t('home.features.items.0.description'),
      link: '/profile',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: ClipboardCheck,
      title: t('home.features.items.1.title'),
      description: t('home.features.items.1.description'),
      link: '/assessment',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: Compass,
      title: t('home.features.items.2.title'),
      description: t('home.features.items.2.description'),
      link: '/recommendations',
      color: 'bg-teal-100 text-teal-700'
    },
    {
      icon: BookOpen,
      title: t('home.features.items.3.title'),
      description: t('home.features.items.3.description'),
      link: '/courses',
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: UserRound,
      title: t('home.features.items.4.title'),
      description: t('home.features.items.4.description'),
      link: '/mentors',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      icon: Users,
      title: t('home.features.items.5.title'),
      description: t('home.features.items.5.description'),
      link: '/community',
      color: 'bg-pink-100 text-pink-700'
    },
    {
      icon: BarChart3,
      title: t('home.features.items.6.title'),
      description: t('home.features.items.6.description'),
      link: '/progress',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      icon: Video,
      title: t('home.features.items.7.title'),
      description: t('home.features.items.7.description'),
      link: '/content',
      color: 'bg-amber-100 text-amber-700'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('home.features.title')}</span>
          </h2>
          <p className="text-lg text-gray-600">
            {t('home.features.subtitle')}
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
