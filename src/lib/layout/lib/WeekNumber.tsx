function getWeek() {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const dayDifference = (currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil((dayDifference * 24 - 11) / 24 / 7);
}

export default function WeekNumber() {
  return (
    <div className="ml-auto flex flex-col items-center justify-center rounded-md bg-indigo-50 p-2 dark:bg-gray-800">
      <span className="text-2xl font-bold">{getWeek()}</span>
      <span>week</span>
    </div>
  );
}
