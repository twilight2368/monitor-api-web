export type StatusInfo = {
  name: string;
  status_code: string;
  status: "UP" | "DOWN";
  response_time?: number;
  error?: string;
};

export type StatusCheckInfo = {
  name: string;
  status: "UP" | "DOWN";
  finish_time?: string;
};
