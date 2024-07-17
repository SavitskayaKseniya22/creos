import { DateDetailedType, IssueDetailedExtendedType, IssueDetailedType, ParsedIssueArrayType } from "./types";

export function getWeek(): number {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const dayDifference = (currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil((dayDifference * 24 - 11) / 24 / 7);
}

function getDateDifference(date: string): number {
  const startOfYear = new Date(date);
  const currentDate = new Date();

  return currentDate.getTime() - startOfYear.getTime();
}

export function convertMilliseconds(ms: number): DateDetailedType {
  let result = ms;

  const days = Math.floor(result / (24 * 60 * 60 * 1000));

  result %= 24 * 60 * 60 * 1000;

  const hours = Math.floor(result / (60 * 60 * 1000));

  result %= 60 * 60 * 1000;

  const minutes = Math.floor(result / (60 * 1000));

  result %= 60 * 1000;

  const seconds = Math.floor(result / 1000);

  result %= 1000;

  return { days, hours, minutes, seconds, ms: result };
}

export function getTimePast(date: string): DateDetailedType {
  const difference = getDateDifference(date);
  return convertMilliseconds(difference);
}

function getTimeSpent(start: string, end: string) {
  return new Date(end).getTime() - new Date(start).getTime();
}

function calculateMedian(times: number[]) {
  times.sort((a, b) => a - b);

  const n = times.length;
  const middle = Math.floor(n / 2);

  if (n % 2 !== 0) {
    return times[middle];
  }

  return (times[middle - 1] + times[middle]) / 2;
}

export function parseIssueArray(array: IssueDetailedType[]): ParsedIssueArrayType[] {
  const designers: { [key: string]: IssueDetailedExtendedType[] } = {};

  array.forEach((item) => {
    const time_spent = getTimeSpent(item.date_started_by_designer, item.date_finished_by_designer);

    if (designers[item.designer] === undefined) {
      designers[item.designer] = [{ ...item, time_spent }];
    } else {
      designers[item.designer].push({ ...item, time_spent });
    }
  });

  return Object.keys(designers)
    .map((name) => {
      const times = designers[name].map((item) => {
        return item.time_spent;
      });

      return {
        name,
        tasks: designers[name],
        count: designers[name].length,
        times,
        median: calculateMedian(times),
      };
    })
    .sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count;
      } else {
        return a.median - b.median;
      }
    });
}

export function createDateString(date: DateDetailedType) {
  const { days, hours, minutes } = date;
  const d = days ? `${days}d` : "";
  const h = hours ? `${hours}h` : "";
  const m = minutes ? `${minutes}m ` : "";

  return `${d}${((d && h) || (d && m)) && ", "}${h}${h && m && ", "}${m}`;
}
export function getPersentageForStatus(data: IssueDetailedType[]): StatusPartType {
  const allTasks = data.length;

  const getP = (value: number) => (value / allTasks) * 100;

  const doneTasks = data.filter((item) => item.status === "Done").length;
  const newTasks = data.filter((item) => item.status === "New").length;
  const progressTasks = data.filter((item) => item.status === "In Progress").length;

  return { done: getP(doneTasks), new: getP(newTasks), progress: getP(progressTasks) };
}
