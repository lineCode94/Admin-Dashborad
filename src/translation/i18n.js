import React from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import dataEn from "./En.json";
import dataAr from "./Ar.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: dataEn,
      },
      ar: {
        translation: dataAr,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const { t } = useTranslation();

  return <h2>{t("Welcome to React")}</h2>;
}

// append app to dom
const root = createRoot(document.getElementById("root"));
root.render(<App />);
