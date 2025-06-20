import parser from "cron-parser";

/**
 * Convert a CRON string to interval in milliseconds.
 * @param {string} cronExpr - The CRON expression
 * @returns {number} Interval in milliseconds.
 */

export function cronToIntervalMs(cronExpr: string): number {
  try {
    const options = { currentDate: new Date() };
    const interval = parser.parse(cronExpr, options);

    const first = interval.next().getTime();
    const second = interval.next().getTime();

    return second - first;
  } catch (err: any) {
    throw new Error(`Invalid CRON expression: ${err.message}`);
  }
}
