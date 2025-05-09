
import { navTranslations } from "./nav";
import { homeTranslations } from "./home";
import { coursesTranslations } from "./courses";
import { mentorsTranslations } from "./mentors";
import { profileTranslations } from "./profile";
import { footerTranslations } from "./footer";
import { notFoundTranslations } from "./notFound";
import { authTranslations } from "./auth";
import { commonTranslations } from "./common";

export const translations = {
  en: {
    ...navTranslations.en,
    ...homeTranslations.en,
    ...coursesTranslations.en,
    ...mentorsTranslations.en,
    ...profileTranslations.en,
    ...footerTranslations.en,
    ...notFoundTranslations.en,
    ...authTranslations.en,
    ...commonTranslations.en,
  },
  "pt-br": {
    ...navTranslations["pt-br"],
    ...homeTranslations["pt-br"],
    ...coursesTranslations["pt-br"],
    ...mentorsTranslations["pt-br"],
    ...profileTranslations["pt-br"],
    ...footerTranslations["pt-br"],
    ...notFoundTranslations["pt-br"],
    ...authTranslations["pt-br"],
    ...commonTranslations["pt-br"],
  }
};
