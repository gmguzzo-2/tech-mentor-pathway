
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

// Type for any nested object with string values, arrays or nested objects
type NestedValue = string | NestedObject | Array<any>;

// Type for any nested object with string values
interface NestedObject {
  [key: string]: NestedValue;
}

// Type guard to check if a property is a nested object
function isNestedObject(obj: NestedValue): obj is NestedObject {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

// Type guard to check if a property is a string
function isString(obj: NestedValue): obj is string {
  return typeof obj === 'string';
}

// Function to get a nested property by path
function getNestedProperty(obj: NestedObject, path: string): NestedValue {
  const keys = path.split('.');
  let current: NestedValue = obj;
  
  for (const key of keys) {
    if (!isNestedObject(current)) {
      console.error(`Translation key "${path}" resolves to a non-object at "${key}".`);
      return path;
    }
    
    if (current[key] === undefined) {
      console.error(`Translation key "${path}" not found at part "${key}".`);
      return path;
    }
    
    current = current[key];
  }
  
  return current;
}

export function useTranslations() {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    try {
      // Cast to unknown first, then to NestedObject to avoid TypeScript errors
      const langTranslations = translations[language] as unknown as NestedObject;
      const value = getNestedProperty(langTranslations, key);
      
      if (!isString(value)) {
        console.warn(`Translation key resolves to a non-string value: ${key}`);
        return key;
      }
      
      return value;
    } catch (error) {
      console.error(`Error translating key "${key}":`, error);
      return key;
    }
  };
  
  return { t };
}
