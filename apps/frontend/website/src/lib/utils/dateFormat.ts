import { format } from "date-fns"

/**
 * Formats a date (string or Date) using date-fns pattern.
 * @param date Date instance or ISO string
 * @param pattern date-fns format pattern (default: dd MMM, yyyy)
 */
const dateFormat = (date: Date | string, pattern = "dd MMM, yyyy"): string => {
  const dateObj = new Date(date)
  const output = format(dateObj, pattern)
  return output
}

export default dateFormat
