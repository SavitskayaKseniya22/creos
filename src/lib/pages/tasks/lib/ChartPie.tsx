import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import { useGetIssuesQuery } from "../../../../store/api";
import { StatusPartType } from "../../../../types";
import { getPersentageForStatus } from "../../../../utils";

export default function ChartPie() {
  const { data, error } = useGetIssuesQuery();
  const [pieData, setPieData] = useState<null | StatusPartType>(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPieData(getPersentageForStatus(data));
    }
  }, [data]);

  if (error) {
    throw error;
  }

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: pieData ? pieData.new : 0, label: "Размещено" },
            { id: 1, value: pieData ? pieData.done : 0, label: "Закрыто" },
            { id: 2, value: pieData ? pieData.progress : 0, label: "Взято в работу" },
          ],
          innerRadius: 32,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
