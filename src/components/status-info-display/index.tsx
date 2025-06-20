import type { ServiceInfo } from "@/types/Services";
import React, { useEffect, useState } from "react";
import HttpMethodTag from "../http-method-tag";
import StatusBar from "../status-bar";
import { getStatusCheckService, getStatusService } from "@/api/api";
import { Tooltip } from "@heroui/react";
import type { StatusCheckInfo, StatusInfo } from "@/types/Status";
import BaseButton from "../elements/base-button";
import BaseModal from "../elements/base-modal";
import StatusTag from "../status-tag";

type StatusInfoDisplayProps = {
  service: ServiceInfo;
};

const StatusInfoDisplay: React.FC<StatusInfoDisplayProps> = ({ service }) => {
  const [status, setStatus] = useState<StatusCheckInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [statusInfo, setStatusInfo] = useState<StatusInfo>();
  useEffect(() => {
    const interval = setInterval(() => {
      getStatusService(service.id)
        .then((res) => {
          // console.log("====================================");
          // console.log(status);
          // console.log("====================================");
          // console.log("====================================");
          // console.log(res.data);
          // console.log("====================================");
          setStatus((status) => {
            const updated = [...status, res.data];
            return updated.slice(-35); // keep last 30 items
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
            <span className="text-gray-800 text-lg font-bold truncate break-all">
              {service?.name}
            </span>
          </Tooltip>
        </div>

        <div className="flex flex-row items-center gap-2 text-sm font-mono">
          <HttpMethodTag method={service?.method} />
          <Tooltip content={service?.url}>
            <span className="text-gray-800 text-xs truncate break-all">
              {service?.url}
            </span>
          </Tooltip>
        </div>

        <div className=" w-fit p-2 flex flex-row justify-start gap-1 items-center ">
          {status?.length ? (
            <>
              {status.map((item: StatusCheckInfo) => (
                <StatusBar
                  status={item.status}
                  time={item.finish_time}
                  className="w-2 h-8"
                />
              ))}
            </>
          ) : (
            <>
              <span className=" italic text-xs">Loading...</span>
            </>
          )}
        </div>

        <div className="w-full flex justify-center items-center">
          <BaseButton
            size="sm"
            color="primary"
            variant="faded"
            onPress={() => {
              getStatusCheckService(service.id)
                .then((res) => {
                  console.log("====================================");
                  console.log("Status check", res.data);
                  console.log("====================================");
                  setStatusInfo(res.data);
                  setIsOpen(true);
                })
                .catch(() => {});
              setIsOpen(true);
            }}
          >
            Check status
          </BaseButton>
        </div>
      </div>

      <>
        <BaseModal isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className="bg-white  p-6 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Status Info
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Name</span>
                <span className="font-semibold text-gray-900">
                  {statusInfo?.name}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  <StatusTag status={statusInfo?.status || "DOWN"} />
                </div>
              </div>

              {statusInfo?.response_time !== undefined && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">
                    Response Time
                  </span>
                  <span
                    className={`font-medium ${
                      statusInfo.response_time < 100
                        ? "text-green-600"
                        : statusInfo.response_time < 500
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {statusInfo.response_time} ms
                  </span>
                </div>
              )}

              {statusInfo?.error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-red-800">Error</p>
                      <p className="text-sm text-red-700 mt-1">
                        {statusInfo?.error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </BaseModal>
      </>
    </>
  );
};

export default StatusInfoDisplay;
