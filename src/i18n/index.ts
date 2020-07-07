import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import json
import tw from './zh-TW.json';
import en from './en-US.json';

const dictionary = {
  'zh-TW': { translation: tw },
  'en-US': { translation: en },
};

// init setting
i18n.use(initReactI18next).init({
  resources: dictionary,
  lng: 'zh-TW', // default language
  returnObjects: true, // allow array structure in json
  interpolation: {
    escapeValue: false,
  },
});
