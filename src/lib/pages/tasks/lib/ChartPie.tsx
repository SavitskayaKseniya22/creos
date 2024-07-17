import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import { useGetIssuesQuery } from "../../../../store/api";
import { PartType, StatusPartType } from "../../../../types";
import { getPartForStatus } from "../../../../utils";
import { useTranslation } from "react-i18next";
import Spinner from "../../../layout/lib/Spinner";
import ErrorView from "../../../layout/lib/ErrorView";

export default function ChartPie() {
  const { data, error, isLoading } = useGetIssuesQuery();
  const [pieData, setPieData] = useState<null | StatusPartType>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setPieData(getPartForStatus(data, PartType.PERCENT));
    }
  }, [data]);

  return (
    <div className="flex max-w-full grow items-center justify-center overflow-x-auto p-2">
      {error && <ErrorView></ErrorView>}
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
