import type { ServiceInfoResponse } from "@/types/ServiceRes";
import type { ServiceInfo } from "@/types/Services";

export const ServiceMapper = (data: ServiceInfoResponse): ServiceInfo => {
  console.log("====================================");
  console.log(data?.data);
  console.log("====================================");

  return {
    id: data.id,
    name: data.name,
    url: data.url,
    method: data.method,
    data: data?.data ? data.data : {},
    cookies: data?.cookies ? data.cookies : {},
    timeout: data.timeout,
    cron: data.cron,
  };
};
