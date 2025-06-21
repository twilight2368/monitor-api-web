import type { ServiceInfo } from "@/types/Services";
import React, { createContext } from "react";

type ServicesContextType = {
  services: ServiceInfo[] | [];
  setServices: React.Dispatch<React.SetStateAction<ServiceInfo[] | []>>;
};

export const ServicesContext = createContext<ServicesContextType | null>(null);

export function useServicesContext(): ServicesContextType {
  const context = React.useContext(ServicesContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
}
