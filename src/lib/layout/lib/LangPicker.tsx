import i18next from "i18next";
import { FormEvent } from "react";

export default function LangPicker() {
  return (
    <form
      className="w-20"
      onChange={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const langValue = formData.get("lang");
        if (langValue) {
          i18next.changeLanguage(langValue as string);
        }
      }}
    >
      <select
        name="lang"
        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm dark:border-gray-800 dark:bg-gray-800"
        defaultValue="en"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
    </form>
  );
}
