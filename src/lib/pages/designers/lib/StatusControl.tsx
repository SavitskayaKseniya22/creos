import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

export default function StatusControl({ onChange }: { onChange: (value: string) => void }) {
  const status = ["New", "In Progress", "Done", "none"];
  const { t } = useTranslation();

  return (
    <form
      onChange={(e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const value = formData.get("status");
        if (value) {
          onChange(value as string);
        }
      }}
    >
      <ul className="flex gap-2">
        {status.map((item, i) => {
          return (
            <li>
              <label
                key={item}
                htmlFor={item + i}
                className="block cursor-pointer rounded-md bg-indigo-50 px-4 py-2 has-[:checked]:bg-indigo-200 dark:bg-gray-800 dark:has-[:checked]:bg-indigo-900"
              >
                {t(`status.${item.toLocaleLowerCase().split(" ").join("")}`)}
                <input
                  type="radio"
                  name="status"
                  id={item + i}
                  value={item}
                  className="hidden"
                  defaultChecked={item === "none"}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
