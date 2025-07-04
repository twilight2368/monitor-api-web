import type { ServiceInfo } from "@/types/Services";
import { useEffect, useState, type ReactNode } from "react";
import { ServicesContext } from "./ServicesContext";
import { getService } from "@/api/api";
import { toast } from "react-toastify";

type ServiceProviderProps = {
  children: ReactNode;
};

const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [services, setServices] = useState<ServiceInfo[]>([]);

  useEffect(() => {
    getService()
      .then((res) => {
        //console.log("Fetching data...");
        setServices(res.data);
      })
      .catch(() => {
        // console.log("====================================");
        // console.log(err);
        // console.log("====================================");
        toast.error("Lấy dữ liệu dịch vụ thất bại!");
      });
  }, []);

  return (
    <>
      <ServicesContext.Provider value={{ services, setServices }}>
        {children}
      </ServicesContext.Provider>
    </>
  );
};

export default ServiceProvider;
