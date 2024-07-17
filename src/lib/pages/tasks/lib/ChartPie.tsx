import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import { useGetIssuesQuery } from "../../../../store/api";
import { StatusPartType } from "../../../../types";
import { getPersentageForStatus } from "../../../../utils";
import { useTranslation } from "react-i18next";
import Spinner from "../../../layout/lib/Spinner";

export default function ChartPie() {
  const { data, error, isLoading } = useGetIssuesQuery();
  const [pieData, setPieData] = useState<null | StatusPartType>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setPieData(getPersentageForStatus(data));
    }
  }, [data]);

  if (error) {
    throw error;
  }

  return (
    <div className="flex max-w-full grow items-center justify-center overflow-x-auto p-2">
      {isLoading && <Spinner></Spinner>}
      {pieData && (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: pieData.new, label: t("status.new") },
                { id: 1, value: pieData.done, label: t("status.done") },
                { id: 2, value: pieData.progress, label: t("status.inprogress") },
              ],
              innerRadius: 32,
            },
          ]}
          width={400}
          height={200}
        />
      )}
    </div>
  );
}
