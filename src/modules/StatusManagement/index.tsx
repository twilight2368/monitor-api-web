import { getService } from "@/api/api";
import StatusInfoDisplay from "@/components/status-info-display";
import { mockServices } from "@/mock";
import type { ServiceInfo } from "@/types/Services";
import React, { useEffect, useState } from "react";

const StatusManagement = () => {
  const [data, setData] = useState<ServiceInfo[]>([]);

  useEffect(() => {
    getService()
      .then((res) => {
        setData(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  }, []);

  
  return (
    <>
      <div className="w-full min-h-96">
        <div className="w-full mb-6">
          <h1 className=" text-3xl ">Status</h1>
        </div>
        <div className="w-full grid grid-cols-3 gap-6">
          {data ? (
            <>
              {data.map((service) => (
                <StatusInfoDisplay service={service} />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default StatusManagement;
