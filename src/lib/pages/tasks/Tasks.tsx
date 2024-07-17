import ChartPie from "./lib/ChartPie";

export default function Tasks() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">Tasks</h2>
      <ChartPie></ChartPie>
    </div>
  );
}
