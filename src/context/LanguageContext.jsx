import { createContext, useContext, useState, useEffect } from "react";
import { setLanguageForApi } from "../api/axiosClient"; 

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en-US");

  // cuando cambia el idioma en el contexto, se actualiza axiosClient
  useEffect(() => {
    setLanguageForApi(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
