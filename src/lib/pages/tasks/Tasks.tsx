import ChartPie from "./lib/ChartPie";
import ChartBar from "./lib/ChartBar";
import { useTranslation } from "react-i18next";

export default function Tasks() {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-between gap-8">
      <h2 className="mb-auto self-start text-xl font-bold">{t("titles.tasks")}</h2>
      <ChartPie></ChartPie>
      <ChartBar></ChartBar>
    </div>
  );
}
