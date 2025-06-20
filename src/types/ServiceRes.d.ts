import type { HttpMethod } from "./Services";

export type ServiceInfoResponse = {
  id: number;
  name: string;
  url: string;
  method: HttpMethod;
  data?: string;
  cookies?: string;
  timeout?: number;
  cron?: string;
};
