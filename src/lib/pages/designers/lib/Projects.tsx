import { FormEvent } from "react";
import { useGetProjectsQuery } from "../../../../store/api";
import { useTranslation } from "react-i18next";

export default function Projects({ onChange }: { onChange: (value: string) => void }) {
  const { data, error, isLoading } = useGetProjectsQuery();
  const { t } = useTranslation();

  if (error) {
    throw error;
  }

  return (
    <form
      onChange={(e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const keyValue = formData.get("project");
        if (keyValue) {
          onChange(keyValue as string);
        }
      }}
    >
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {isLoading &&
          new Array(5).fill(0).map((_, i) => {
            return (
              <li key={i} className="h-10 w-16 animate-pulse rounded-md bg-indigo-50 px-4 py-2 dark:bg-gray-800"></li>
            );
          })}
        {data && (
          <>
            {data.map((project) => {
              return (
                <li key={project.key}>
                  <label
                    htmlFor={project.key}
                    className="block cursor-pointer rounded-md bg-indigo-50 px-4 py-2 has-[:checked]:bg-indigo-200 dark:bg-gray-800 dark:has-[:checked]:bg-indigo-900"
                  >
                    {project.key}
                    <input type="radio" value={project.key} name="project" id={project.key} className="hidden" />
                  </label>
                </li>
              );
            })}
            <li key="none">
              <label
                htmlFor="none"
                className="block cursor-pointer rounded-md bg-indigo-50 px-4 py-2 has-[:checked]:bg-indigo-200 dark:bg-gray-800 dark:has-[:checked]:bg-indigo-900"
              >
                {t("status.none")}
                <input type="radio" value="none" name="project" id="none" className="hidden" defaultChecked />
              </label>
            </li>
          </>
        )}
      </ul>
    </form>
  );
}
