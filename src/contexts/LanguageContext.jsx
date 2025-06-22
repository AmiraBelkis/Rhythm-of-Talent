
    import React, { createContext, useState, useEffect, useContext } from 'react';
    import en from '@/locales/en.json';
    import fr from '@/locales/fr.json';
    import ar from '@/locales/ar.json';

    const translations = { en, fr, ar };

    const LanguageContext = createContext();

    export const LanguageProvider = ({ children }) => {
      const [language, setLanguage] = useState(localStorage.getItem('juryLang') || 'en');

      useEffect(() => {
        localStorage.setItem('juryLang', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      }, [language]);

      const t = (key, replacements = {}) => {
        let translation = translations[language][key] || translations['en'][key] || key;
        Object.keys(replacements).forEach(placeholder => {
          translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        });
        return translation;
      };
      
      const changeLanguage = (lang) => {
        if (translations[lang]) {
          setLanguage(lang);
        }
      };

      return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
          {children}
        </LanguageContext.Provider>
      );
    };

    export const useLanguage = () => useContext(LanguageContext);
  