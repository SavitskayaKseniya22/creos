import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

export default function ThemePicker() {
  const { t } = useTranslation();
  return (
    <form
      className="w-20"
      onChange={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const themeValue = formData.get("theme");
        if (themeValue) {
          document.body.classList.remove("light", "dark");
          document.body.classList.add(themeValue as string);
        }
      }}
    >
      <select
        name="theme"
        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm dark:border-gray-800 dark:bg-gray-800"
        defaultValue="Light"
      >
        <option value="light">{t("theme.light")}</option>
        <option value="dark">{t("theme.dark")}</option>
      </select>
    </form>
  );
}
