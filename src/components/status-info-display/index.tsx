import type { ServiceInfo } from "@/types/Services";
import React, { useEffect, useState } from "react";
import HttpMethodTag from "../http-method-tag";
import StatusBar from "../status-bar";
import { getStatusService } from "@/api/api";
import { Tooltip } from "@heroui/react";
import type { StatusInfo } from "@/types/Status";

type StatusInfoDisplayProps = {
  service: ServiceInfo;
};

const StatusInfoDisplay: React.FC<StatusInfoDisplayProps> = ({ service }) => {
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      getStatusService(service.id)
        .then((res) => {
          console.log("====================================");
          console.log(status);
          console.log("====================================");
          // console.log("====================================");
          // console.log(res.data);
          // console.log("====================================");
          setStatus((status) => {
            const updated = [...status, res.data];
            return updated.slice(-30); // keep last 30 items
          });
        })
        .catch((err) => {
          console.log("====================================");
          console.log(err);
          console.log("====================================");
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center text-xs">
          <Tooltip content={service?.name}>
            <span className="text-gray-800 text-lg truncate break-all">
              {service?.name}
            </span>
          </Tooltip>
          {service?.cron && (
            <span className="font-mono text-gray-500 min-w-8 bg-gray-100 px-2 py-0.5 rounded text-xs">
              {service?.cron}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm font-mono">
          <HttpMethodTag method={service?.method} />
          <Tooltip content={service?.url}>
            <span className="text-gray-800 text-xs truncate break-all">
              {service?.url}
            </span>
          </Tooltip>
        </div>

        <div className="w-full p-2 flex flex-row justify-between items-center ">
          {status.map((item: StatusInfo) => (
            <StatusBar
              status={item.status}
              time={item.finish_time}
              className="w-2 h-8"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StatusInfoDisplay;
