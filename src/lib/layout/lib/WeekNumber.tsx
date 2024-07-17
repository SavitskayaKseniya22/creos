import { useTranslation } from "react-i18next";
import { getWeekNumber } from "../../../utils";

export default function WeekNumber() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-indigo-50 p-2 dark:bg-gray-800">
      <span className="text-2xl font-bold">{getWeekNumber(new Date())}</span>
      <span>{t("week")}</span>
    </div>
  );
}
