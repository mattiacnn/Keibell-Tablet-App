import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

const LanguageContext = React.createContext();

const LanguageProvider = (props) => {

  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  return (
    <LanguageContext.Provider
      value={{
        t,
        changeLanguage,
        currentLanguage
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}

export { LanguageProvider, LanguageContext };