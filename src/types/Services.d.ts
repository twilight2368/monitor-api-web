export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ServiceInfo = {
  id: number;
  name: string;
  url: string;
  method: HttpMethod;
  data?: Record<string, any>;
  cookies?: Record<string, string>;
  timeout?: number;
  cron?: string;
};
