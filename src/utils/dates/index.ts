import "dayjs/locale/de"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import duration from "dayjs/plugin/duration"
import isBetween from "dayjs/plugin/isBetween"
import isoWeek from "dayjs/plugin/isoWeek"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(isoWeek)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)
dayjs.locale("de")
dayjs.extend(isoWeek)

type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

export const weekdays: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

interface DateRange {
  startDate: string
  endDate: string
}

export const getDateString = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY")
}

export const getDateAndTimeInGermanFromAWSDateTimeFormat = (
  dateString: string
) => {
  return dayjs(dateString).format("DD.MM.YYYY - HH:mm")
}

export const getDateInGermanFormat = (date: Date) => {
  return dayjs(date).format("DD.MM.YYYY")
}

export const getDateInGermanFromAWSDateTimeFormat = (dateString: string) => {
  return dayjs(dateString).format("DD.MM.YYYY")
}

// For a selected month like "2025-08"
export const getMonthDateRange = (month: string): DateRange => {
  const startDate = dayjs(month)
    .startOf("month")
    .format("YYYY-MM-DDT00:00:00[Z]")
  const endDate = dayjs(month).endOf("month").format("YYYY-MM-DDT23:59:59[Z]")
  return { startDate, endDate }
}

// For a selected week like "2025-08-19" (any date within the week)
export const getWeekDateRange = (weekDate: string): DateRange => {
  const startDate = dayjs(weekDate)
    .startOf("isoWeek")
    .format("YYYY-MM-DDT00:00:00[Z]")
  const endDate = dayjs(weekDate)
    .endOf("isoWeek")
    .format("YYYY-MM-DDT23:59:59[Z]")
  return { startDate, endDate }
}
