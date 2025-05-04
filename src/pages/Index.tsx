
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CourseList from "@/components/courses/CourseList";
import MentorCard from "@/components/mentors/MentorCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, BookText, UserRound, Target, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, mentors, courseRecommendations } from "@/lib/data";
import { useTranslations } from "@/hooks/useTranslations";

const Index = () => {
  const { t } = useTranslations();
  
  // Get featured courses (first 3)
  const featuredCourses = courses.slice(0, 3);
  
  // Get featured mentors (first 2)
  const featuredMentors = mentors.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <Hero />
        
        {/* Main features */}
        <Features />
        
        {/* How it works section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.howItWorks.title')} <span className="gradient-text">TechPathways</span>
              </h2>
              <p className="text-lg text-gray-600">
                {t('home.howItWorks.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-16 h-16 rounded-full bg-techblue/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-techblue" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('home.howItWorks.steps.0.title')}</h3>
                <p className="text-gray-600">
                  {t('home.howItWorks.steps.0.description')}
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-16 h-16 rounded-full bg-techpurple/10 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-techpurple" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('home.howItWorks.steps.1.title')}</h3>
                <p className="text-gray-600">
                  {t('home.howItWorks.steps.1.description')}
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-16 h-16 rounded-full bg-techteal/10 flex items-center justify-center">
                  <UserRound className="h-8 w-8 text-techteal" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('home.howItWorks.steps.2.title')}</h3>
                <p className="text-gray-600">
                  {t('home.howItWorks.steps.2.description')}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-techblue hover:bg-techblue/90">
                <Link to="/profile" className="flex items-center">
                  {t('home.howItWorks.getStarted')} <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured courses */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold mb-4 md:mb-0">{t('home.featuredCourses.title')}</h2>
              <Link to="/courses" className="text-techblue hover:text-techblue/80 font-medium flex items-center">
                {t('home.featuredCourses.viewAll')} <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <CourseList courses={featuredCourses} showFilters={false} title="" />
          </div>
        </section>
        
        {/* Course recommendations */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.learningPaths.title')} <span className="gradient-text">{t('home.learningPaths.byCategory')}</span>
              </h2>
              <p className="text-lg text-gray-600">
                {t('home.learningPaths.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(courseRecommendations).map(([category, recommendations], index) => (
                <Card key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-2 ${getColorClass(category)}`}></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{t(`home.categories.${category.toLowerCase().replace(' ', '')}`)}</h3>
                    <ul className="space-y-3">
                      {recommendations.map((course, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{t(`home.recommendations.${category.toLowerCase().replace(' ', '')}.${idx}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-gray-100 text-gray-800 hover:bg-gray-200">
                      <Link to={`/courses?category=${category.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-center">
                        {t('home.explorePath')} <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Meet our mentors */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold mb-4 md:mb-0">{t('home.mentors.title')}</h2>
              <Link to="/mentors" className="text-techblue hover:text-techblue/80 font-medium flex items-center">
                {t('home.mentors.viewAll')} <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-xl font-medium mb-4">{t('home.mentors.ready')}</p>
              <Button size="lg" className="bg-techpurple hover:bg-techpurple/90">
                <Link to="/mentors" className="flex items-center">
                  {t('home.mentors.findYours')} <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              {t('home.testimonials.title')} <span className="gradient-text">{t('home.testimonials.highlight')}</span>
            </h2>
            
            {/* Placeholder for testimonials */}
            <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
              <p className="text-lg italic text-gray-600 mb-6">
                {t('home.testimonials.quote')}
              </p>
              <div className="flex items-center justify-center">
                <img src="/placeholder.svg" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div className="text-left">
                  <p className="font-medium">Maria Silva</p>
                  <p className="text-sm text-gray-500">{t('home.testimonials.role')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-techblue to-techpurple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-techblue hover:bg-gray-100">
                <Link to="/profile">{t('home.cta.createProfile')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/courses">{t('home.cta.exploreCourses')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function to determine color class based on category
function getColorClass(category: string): string {
  switch (category) {
    case 'Web Development':
      return 'bg-blue-500';
    case 'Data Science':
      return 'bg-purple-500';
    case 'Programming':
      return 'bg-green-500';
    case 'DevOps':
      return 'bg-orange-500';
    case 'Design':
      return 'bg-pink-500';
    default:
      return 'bg-gray-500';
  }
}

// Card component for recommended courses
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={className || ""}>
      {children}
    </div>
  );
};

export default Index;
