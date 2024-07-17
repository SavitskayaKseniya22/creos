import { BarChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { useGetAllDoneIssuesQuery } from "../../../../store/api";
import { WeekData } from "../../../../types";
import WeekPicker from "./WeekPicker";
import { getWeekNumber } from "../../../../utils";
import { useTranslation } from "react-i18next";

export default function ChartBar() {
  const [weekAmount, setWeekAmount] = useState(8);
  const { data, error } = useGetAllDoneIssuesQuery();
  const [chartData, setChartData] = useState<null | WeekData[]>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      const weeksData: WeekData[] = [];
      data.forEach((item) => {
        const weekNumber = getWeekNumber(item.date_finished);
        const outcome = item.send_to_account_manager + item.send_to_designer + item.send_to_project_manager;
        const income = item.received_from_client;
        const profit = income - outcome;

        if (weeksData[weekNumber] === undefined) {
          weeksData[weekNumber] = {
            outcome,
            profit,
            income,
            weekNumber,
            month: new Date(item.date_finished).getMonth(),
          };
        } else {
          weeksData[weekNumber].outcome += outcome;
          weeksData[weekNumber].profit += profit;
          weeksData[weekNumber].income += income;
        }
      });

      setChartData(weeksData.sort((a, b) => b.weekNumber - a.weekNumber).slice(0, weekAmount));
    }
  }, [data, weekAmount]);

  if (error) {
    throw error;
  }

  return (
    chartData && (
      <div className="max-w-full overflow-x-auto p-2">
        <WeekPicker
          onChange={(value) => {
            setWeekAmount(+value);
          }}
        ></WeekPicker>
        <BarChart
          dataset={chartData}
          xAxis={[
            { id: "week", scaleType: "band", dataKey: "weekNumber" },
            {
              id: "month",
              scaleType: "band",
              dataKey: "month",
              valueFormatter: (value) => t(`month.${value}`),
            },
          ]}
          topAxis={"month"}
          series={[
            { dataKey: "income", label: t("money.income") },
            { dataKey: "outcome", label: t("money.outcome") },
            { dataKey: "profit", label: t("money.profit") },
          ]}
          width={800}
          height={350}
          slotProps={{
            legend: {
              padding: -5,
            },
          }}
        />
      </div>
    )
  );
}
