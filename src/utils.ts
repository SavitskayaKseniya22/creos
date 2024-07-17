import { TFunction } from "i18next";
import {
  DateDetailedType,
  IssueDetailedExtendedType,
  IssueDetailedType,
  IssueShortType,
  DesignerStatType,
  PartType,
  StatusPartType,
} from "./types";

export function getWeekNumber(date: string | Date): number {
  const currentDate = date instanceof Date ? date : new Date(date);
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const dayDifference = (currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil((dayDifference * 24 - 11) / 24 / 7);
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

function getDateDifference(start: string, end?: string): number {
  const currentDate = end ? new Date(end) : new Date();
  return currentDate.getTime() - new Date(start).getTime();
}

export function getTimePast(date: string): DateDetailedType {
  const difference = getDateDifference(date);
  return convertMilliseconds(difference);
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

export function convertToDesignerStat(array: IssueDetailedType[]): DesignerStatType[] {
  const designers: { [key: string]: IssueDetailedExtendedType[] } = {};

  array.forEach((item) => {
    const time_spent = getDateDifference(item.date_started_by_designer, item.date_finished_by_designer);

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

export function createDateString(date: DateDetailedType, t: TFunction<"translation", undefined>) {
  const { days, hours, minutes } = date;
  const d = days ? `${days}${t("date.d")}` : "";
  const h = hours ? `${hours}${t("date.h")}` : "";
  const m = minutes ? `${minutes}${t("date.m")} ` : "";

  return `${d}${((d && h) || (d && m)) && ", "}${h}${h && m && ", "}${m}`;
}

export function getPartForStatus(data: IssueDetailedType[] | IssueShortType[], type: PartType): StatusPartType {
  const allTasks = data.length;
  const doneTasks = data.filter((item) => item.status === "Done").length;
  const newTasks = data.filter((item) => item.status === "New").length;
  const progressTasks = data.filter((item) => item.status === "In Progress").length;

  if (type === PartType.PERCENT) {
    const getP = (value: number) => (value / allTasks) * 100;
    return { done: getP(doneTasks), new: getP(newTasks), progress: getP(progressTasks) };
  } else {
    return { done: doneTasks, new: newTasks, progress: progressTasks };
  }
}

export function generateId(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
