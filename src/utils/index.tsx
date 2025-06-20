import parser from "cron-parser";

/**
 * Convert a CRON string to interval in milliseconds.
 * @param {string} cronExpr - The CRON expression
 * @returns {number} Interval in milliseconds.
 */

export function cronToIntervalMs(cronExpr: string): number {
  if (!cronExpr) {
    return 1000;
  }
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

export function msToTime(ms: number): string {
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}
