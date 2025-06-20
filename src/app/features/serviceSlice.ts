import type { ServiceInfo } from "@/types/Services";
import type { StatusInfo } from "@/types/Status";
import { createSlice } from "@reduxjs/toolkit";

type ServiceType = {
  service: ServiceInfo;
  status: StatusInfo[];
};

const initState = {
  service: [],
};

