import { getWeek } from "../../../utils";

export default function WeekNumber() {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-indigo-50 p-2 dark:bg-gray-800">
      <span className="text-2xl font-bold">{getWeek()}</span>
      <span>week</span>
    </div>
  );
}
