import { BarChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { useGetAllDoneIssuesQuery } from "../../../../store/api";
import { WeekData } from "../../../../types";
import WeekPicker from "./WeekPicker";
import { getMonthValue, getWeekNumber } from "../../../../utils";

export default function ChartBar() {
  const [weekAmount, setWeekAmount] = useState(8);
  const { data, error } = useGetAllDoneIssuesQuery();
  const [chartData, setChartData] = useState<null | WeekData[]>(null);

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
            month: getMonthValue(new Date(item.date_finished).getMonth()),
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
      <div className="max-w-full overflow-x-scroll p-2">
        <WeekPicker
          onChange={(value) => {
            setWeekAmount(+value);
          }}
        ></WeekPicker>
        <BarChart
          dataset={chartData}
          xAxis={[
            { id: "week", scaleType: "band", dataKey: "weekNumber" },
            { id: "month", scaleType: "band", dataKey: "month" },
          ]}
          topAxis={"month"}
          series={[
            { dataKey: "income", label: "Income" },
            { dataKey: "outcome", label: "Outcome" },
            { dataKey: "profit", label: "Profit" },
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
