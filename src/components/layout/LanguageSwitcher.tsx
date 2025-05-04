
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt-br' : 'en');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center space-x-1"
    >
      <span className="text-xs font-medium">
        {language === 'en' ? '🇺🇸 EN' : '🇧🇷 PT'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
