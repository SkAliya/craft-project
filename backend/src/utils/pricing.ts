import { toTz } from "./time";
import dayjs from "dayjs";

/**
 * Pricing rules:
 * - Base hourly rate for off-peak
 * - Peak hours (Mon-Fri): 10:00-13:00 and 16:00-19:00 => multiplier 1.5
 * - We prorate by minutes (price = sum of per-minute rates)
 */

const PEAK_MULTIPLIER = 1.5;

function isWeekday(d: dayjs.Dayjs) {
  const day = d.day(); // 0 Sun, 1 Mon ... 6 Sat
  return day >= 1 && day <= 5;
}

function isPeakSlot(d: dayjs.Dayjs) {
  if (!isWeekday(d)) return false;
  const hour = d.hour();
  const minute = d.minute();
  // peak windows: 10:00-13:00, 16:00-19:00
  const inFirst = hour >= 10 && (hour < 13 || (hour === 12 && minute === 0));
  const inSecond = hour >= 16 && (hour < 19 || (hour === 18 && minute === 0));
  return (hour >= 10 && hour < 13) || (hour >= 16 && hour < 19);
}

/**
 * Compute total price by summing minute-by-minute prorated price.
 * Safer approach: iterate per-minute (duration in minutes is max 720) - acceptable here.
 */
export function computePrice(
  startIso: string,
  endIso: string,
  baseHourlyRate: number
): number {
  const start = toTz(startIso);
  const end = toTz(endIso);
  const totalMinutes = Math.max(0, end.diff(start, "minute"));
  let total = 0;
  for (let i = 0; i < totalMinutes; i++) {
    const minuteTime = start.add(i, "minute");
    const multiplier = isPeakSlot(minuteTime) ? PEAK_MULTIPLIER : 1;
    const perMinute = (baseHourlyRate * multiplier) / 60;
    total += perMinute;
  }
  // round to nearest rupee
  return Math.round(total);
}
