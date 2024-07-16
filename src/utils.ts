import { DateDetailedType } from "./types";

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

function convertMilliseconds(ms: number): DateDetailedType {
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
