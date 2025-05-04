
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

// Type for any nested object with string values
type NestedObject = {
  [key: string]: string | NestedObject;
};

// Type guard to check if a property is a nested object
function isNestedObject(obj: string | NestedObject): obj is NestedObject {
  return typeof obj !== 'string';
}

// Function to get a nested property by path
function getNestedProperty(obj: NestedObject, path: string): string | NestedObject {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
    current = current[key];
  }
  
  return current;
}

export function useTranslations() {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    const langTranslations = translations[language] as NestedObject;
    const value = getNestedProperty(langTranslations, key);
    
    if (isNestedObject(value)) {
      console.warn(`Translation key resolves to an object not a string: ${key}`);
      return key;
    }
    
    return value;
  };
  
  return { t };
}
