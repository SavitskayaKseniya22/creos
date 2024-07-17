import ChartPie from "./lib/ChartPie";
import ChartBar from "./lib/ChartBar";

export default function Tasks() {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-8">
      <h2 className="mb-auto self-start text-xl font-bold">Tasks</h2>
      <ChartPie></ChartPie>
      <ChartBar></ChartBar>
    </div>
  );
}
