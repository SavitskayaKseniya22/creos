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
      week: "week",
      titles: {
        home: "Home",
        designers: "Designers",
        tasks: "Tasks",
        comments: "Last comments",
      },

      status: {
        new: "New",
        inprogress: "In Progress",
        done: "Done",
        none: "None",
      },
      sort: {
        nameup: "Name Up",
        namedown: "Name Down",
        emailup: "Email Up",
        emaildown: "Email Down",
      },
      page: {
        prev: "Previous",
        next: "Next",
      },
      date: {
        time: "Time",
        d: "d",
        h: "h",
        m: "m",
        ago: "ago",
      },
      money: {
        income: "Income",
        outcome: "Outcome",
        profit: "Profit",
      },
      month: {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      },
      emptysearch: "No designers found. Change settings to repeate the search",
      error: {
        text: "Sorry, an unexpected error has occurred. Please, reload the page",
        404: "Sorry, page is not found",
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
      week: "неделя",
      titles: {
        home: "Главная",
        designers: "Дизайнеры",
        tasks: "Проекты",
        comments: "Последние комментарии",
      },
      status: {
        new: "Новый",
        inprogress: "В Работе",
        done: "Готовый",
        none: "Нет",
      },
      sort: {
        nameup: "Имя по возрастанию",
        namedown: "Имя по убыванию",
        emailup: "Email по возрастанию",
        emaildown: "Email по убыванию",
      },
      page: {
        prev: "Предыдущая",
        next: "Следующая",
      },

      date: {
        time: "Время",
        d: "д",
        h: "ч",
        m: "м",
        ago: "назад",
      },
      money: {
        income: "Приход",
        outcome: "Затраты",
        profit: "Прибыль",
      },
      month: {
        0: "Январь",
        1: "Февраль",
        2: "Март",
        3: "Апрель",
        4: "Май",
        5: "Июнь",
        6: "Июль",
        7: "Август",
        8: "Сентябрь",
        9: "Октябрь",
        10: "Ноябрь",
        11: "Декабрь",
      },
      emptysearch: "Дизайнеры не найдены. Измените настройки, чтобы повторить поиск",
      error: {
        text: "Произошла ошибка. Перезагрузите страницу",
        404: "Простите, страница не найдена",
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
