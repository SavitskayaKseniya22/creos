import { BarChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { useGetAllDoneIssuesQuery } from "../../../../store/api";
import { WeekData } from "../../../../types";
import WeekPicker from "./WeekPicker";
import { getWeekNumber } from "../../../../utils";
import { useTranslation } from "react-i18next";
import Spinner from "../../../layout/lib/Spinner";
import ErrorView from "../../../layout/lib/ErrorView";

export default function ChartBar() {
  const [weekAmount, setWeekAmount] = useState(8);
  const { data, error, isLoading } = useGetAllDoneIssuesQuery();
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

  return (
    <div className="flex max-w-full grow flex-col items-center justify-center gap-2 p-2">
      {error && <ErrorView></ErrorView>}
      {isLoading && <Spinner></Spinner>}
      {chartData && (
        <>
          <WeekPicker
            onChange={(value) => {
              setWeekAmount(+value);
            }}
          ></WeekPicker>

          <div className="w-full overflow-x-auto">
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
              margin={{
                left: 60,
                right: 0,
                top: 80,
                bottom: 30,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
