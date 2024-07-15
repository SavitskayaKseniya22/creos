import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      footer: {
        copy: "made by Kseniia Savitskaia in 2024 for Creos",
      },
      theme: {
        dark: "Dark",
        light: "Light",
      },
    },
  },
  ru: {
    translation: {
      footer: {
        copy: "cделано Ксенией Савицкой в 2024 году для Creos",
      },
      theme: {
        dark: "Тёмная",
        light: "Светлая",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
