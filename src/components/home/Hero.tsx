
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslations } from "@/hooks/useTranslations";

const Hero = () => {
  const { t } = useTranslations();

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - text content */}
          <div className="animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-techblue to-techpurple rounded-full mr-4"></div>
              <span className="text-gray-600 uppercase tracking-wider text-sm font-medium">{t('home.hero.subtitle')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-techblue hover:bg-techblue/90">
                <Link to="/courses" className="flex items-center">
                  {t('home.hero.exploreCourses')} <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-techpurple text-techpurple hover:bg-techpurple/10">
                <Link to="/mentors" className="flex items-center">
                  {t('home.hero.findMentor')} <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <div className="font-bold text-3xl text-techblue">500+</div>
                <div className="text-gray-500 text-sm mt-1">{t('home.hero.stats.courses')}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-techpurple">120+</div>
                <div className="text-gray-500 text-sm mt-1">{t('home.hero.stats.mentors')}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-3xl text-techteal">15k+</div>
                <div className="text-gray-500 text-sm mt-1">{t('home.hero.stats.students')}</div>
              </div>
            </div>
          </div>

          {/* Right column - illustration/image */}
          <div className="relative">
            <div className="relative z-10 rounded-xl bg-white shadow-xl p-6 md:p-8 animate-float">
              <div className="absolute -top-3 -right-3 bg-techpurple text-white text-xs font-bold px-3 py-1 rounded-full">
                {t('home.popular')}
              </div>
              <h3 className="text-lg font-bold mb-4">{t('home.webDevPathway')}</h3>
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg" alt="Mentor" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="font-semibold">Carlos Santos</div>
                  <div className="text-xs text-gray-500">{t('home.seniorDevAt')} Google</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Clock className="text-gray-400 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-600">{t('home.sixMonthsPathway')}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="text-gray-400 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-600">{t('home.coursesIncluded', { count: 12 })}</span>
                </div>
                <div className="flex items-center">
                  <Award className="text-gray-400 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-600">{t('home.certificate')}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <h4 className="font-medium text-sm mb-2">{t('home.skillsYoullGain')}:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-blue">HTML</span>
                  <span className="badge badge-blue">CSS</span>
                  <span className="badge badge-blue">JavaScript</span>
                  <span className="badge badge-blue">React</span>
                  <span className="badge badge-blue">Node.js</span>
                </div>
              </div>

              <Button className="w-full bg-techblue hover:bg-techblue/90">{t('home.viewPathway')}</Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-4 -left-8 w-24 h-24 bg-techpurple/10 rounded-full animate-pulse"></div>
            <div className="absolute top-10 -right-6 w-16 h-16 bg-techteal/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 right-20 w-12 h-12 bg-techlightpurple/15 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
