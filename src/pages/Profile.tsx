import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileForm from "@/components/profile/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  UserRound,
  BookOpen, 
  Clock, 
  BarChart3,
  Award,
  Settings,
  Bell
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const Profile = () => {
  const { t } = useTranslations();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserRound className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">{t('profile.title')}</h2>
                    <p className="text-gray-500">{t('profile.subtitle')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <nav className="flex flex-col">
                  <a href="#profile" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-techblue bg-blue-50 text-techblue font-medium">
                    <UserRound className="h-5 w-5" />
                    <span>{t('profile.menu.profile')}</span>
                  </a>
                  <a href="#learning" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-techblue transition-colors">
                    <BookOpen className="h-5 w-5" />
                    <span>{t('profile.menu.learning')}</span>
                  </a>
                  <a href="#progress" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-techblue transition-colors">
                    <BarChart3 className="h-5 w-5" />
                    <span>{t('profile.menu.progress')}</span>
                  </a>
                  <a href="#sessions" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-techblue transition-colors">
                    <Clock className="h-5 w-5" />
                    <span>{t('profile.menu.sessions')}</span>
                  </a>
                  <a href="#achievements" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-techblue transition-colors">
                    <Award className="h-5 w-5" />
                    <span>{t('profile.menu.achievements')}</span>
                  </a>
                  <a href="#notifications" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-techblue transition-colors">
                    <Bell className="h-5 w-5" />
                    <span>{t('profile.menu.notifications')}</span>
                  </a>
                  <a href="#account" className="flex items-center space-x-3 px-4 py-3 border-l-4 border-transparent hover:bg-gray-50 text-gray-700 hover:text-techblue transition-colors">
                    <Settings className="h-5 w-5" />
                    <span>{t('profile.menu.settings')}</span>
                  </a>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Tabs defaultValue="profile">
                  <TabsList className="mb-6">
                    <TabsTrigger value="profile">{t('profile.tabs.info')}</TabsTrigger>
                    <TabsTrigger value="recommendations">{t('profile.tabs.recommendations')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <ProfileForm />
                  </TabsContent>
                  
                  <TabsContent value="recommendations">
                    <div className="space-y-6">
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700">{t('profile.completeProfile')}</h3>
                        <p className="text-gray-500 mt-2 mb-6">
                          {t('profile.completeProfileDesc')}
                        </p>
                        <Button className="bg-techblue hover:bg-techblue/90">
                          {t('profile.completeBtn')}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
