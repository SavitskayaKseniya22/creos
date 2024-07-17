import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import { useGetIssuesQuery } from "../../../../store/api";
import { StatusPartType } from "../../../../types";
import { getPersentageForStatus } from "../../../../utils";
import { useTranslation } from "react-i18next";

export default function ChartPie() {
  const { data, error } = useGetIssuesQuery();
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
    <div className="max-w-full overflow-x-auto p-2">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: pieData ? pieData.new : 0, label: t("status.new") },
              { id: 1, value: pieData ? pieData.done : 0, label: t("status.done") },
              { id: 2, value: pieData ? pieData.progress : 0, label: t("status.inprogress") },
            ],
            innerRadius: 32,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}
