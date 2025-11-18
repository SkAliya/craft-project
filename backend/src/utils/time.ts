import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = process.env.TIMEZONE || "Asia/Kolkata";

export function toTz(d: string | Date) {
  return dayjs(d).tz(TIMEZONE);
}

export function nowTz() {
  return dayjs().tz(TIMEZONE);
}
