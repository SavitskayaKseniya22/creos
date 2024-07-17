import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

export default function SortControl({ onChange }: { onChange: (value: string) => void }) {
  const { t } = useTranslation();
  return (
    <form
      onChange={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const sortValue = formData.get("sort");
        if (sortValue) {
          onChange(sortValue as string);
        }
      }}
    >
      <select
        name="sort"
        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm dark:border-gray-800 dark:bg-gray-800"
        defaultValue="username"
      >
        <option value="username">{t("sort.nameup")}</option>
        <option value="-username">{t("sort.namedown")}</option>
        <option value="email">{t("sort.emailup")}</option>
        <option value="-email">{t("sort.emaildown")}</option>
      </select>
    </form>
  );
}
