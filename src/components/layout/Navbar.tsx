
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, BookOpen, UsersRound, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslations();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-techblue to-techpurple rounded-md w-8 h-8 flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline">TechPathways</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={t('nav.search')} 
                className="w-full pl-8"
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/courses" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-techblue">{t('nav.courses')}</Link>
            <Link to="/mentors" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-techblue">{t('nav.mentors')}</Link>
            <Link to="/community" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-techblue">{t('nav.community')}</Link>
            <div className="flex items-center space-x-3 ml-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="outline">{t('nav.signIn')}</Button>
              <Button>{t('nav.signUp')}</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 flex flex-col items-center justify-center">
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3 space-y-3">
            <Link to="/courses" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-techblue hover:bg-gray-50 rounded-md">
              {t('nav.courses')}
            </Link>
            <Link to="/mentors" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-techblue hover:bg-gray-50 rounded-md">
              {t('nav.mentors')}
            </Link>
            <Link to="/community" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-techblue hover:bg-gray-50 rounded-md">
              {t('nav.community')}
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full justify-center">{t('nav.signIn')}</Button>
              <Button className="w-full justify-center">{t('nav.signUp')}</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
