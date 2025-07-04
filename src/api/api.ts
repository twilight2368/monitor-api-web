import type { ServiceInfo } from "@/types/Services";
import axios from "axios";

const API_URL = process.env.API_URL || "api";

export const getService = () => {
  return axios.get(`${API_URL}/services`);
};

export const createService = (data: ServiceInfo) => {
  return axios.post(API_URL + "/services", {
    name: data.name,
    url: data.url,
    method: data.method,
    data: data?.data || {},
    cookies: data?.cookies || {},
    timeout: data.timeout,
    schedule_time: data.cron,
  });
};

export const updateService = (id: number, data: ServiceInfo) => {
  return axios.put(`${API_URL}/services/${id}`, {
    name: data.name,
    url: data.url,
    method: data.method,
    data: data?.data,
    cookies: data?.cookies,
    timeout: data.timeout,
    schedule_time: data.cron,
  });
};

export const deleteService = (id: number) => {
  return axios.delete(`${API_URL}/services/${id}`);
};

export const getStatusService = (id: number) => {
  return axios.get(`${API_URL}/services/${id}/status`);
};

export const getStatusCheckService = (id: number) => {
  return axios.get(`${API_URL}/services/${id}/check`);
};
