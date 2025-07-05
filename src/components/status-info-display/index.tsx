import type { ServiceInfo } from "@/types/Services";
import React, { useEffect, useState } from "react";
import HttpMethodTag from "../http-method-tag";
import StatusBar from "../status-bar";
import {
  getStatusCheckService,
  getStatusesService,
  getStatusService,
} from "@/api/api";
import { Tooltip } from "@heroui/react";
import type { StatusCheckInfo, StatusInfo } from "@/types/Status";
import BaseButton from "../elements/base-button";
import BaseModal from "../elements/base-modal";
import StatusTag from "../status-tag";
import { cronToIntervalMs, msToTime } from "@/utils";
import { MdOutlineWifiTetheringError } from "react-icons/md";
import ResponseTimeTag from "../response-time";
import { toast } from "react-toastify";
type StatusInfoDisplayProps = {
  service: ServiceInfo;
};

const StatusInfoDisplay: React.FC<StatusInfoDisplayProps> = ({ service }) => {
  const [status, setStatus] = useState<StatusCheckInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [statusInfo, setStatusInfo] = useState<StatusInfo>();
  const [checking, setChecking] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      getStatusesService(service.id)
        .then((res) => {
          setStatus(res?.data.slice(-50) || []);
        })
        .catch(() => {
          toast.error(
            `${service?.name} không thể lấy dữ liệu trạng thái. Xin vui lòng kiểm tra`
          );
        });
    }, cronToIntervalMs(service.cron));

    return () => clearInterval(interval);
  }, [service.cron, service.id, service?.name]);

  useEffect(() => {
    getStatusesService(service.id)
      .then((res) => {
        setStatus(res?.data.slice(-50) || []);
      })
      .catch(() => {
        toast.error(
          `${service?.name} không thể lấy dữ liệu trạng thái. Xin vui lòng kiểm tra`
        );
      });
  }, [checking, service.id, service?.name]);

  return (
    <>
      <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <Tooltip content={service?.name}>
            <span className="text-gray-800 text-lg font-bold truncate break-all">
              {service?.name}
            </span>
          </Tooltip>
        </div>

        <div className="mb-2">
          <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">
            Cron: {msToTime(cronToIntervalMs(service.cron))}
          </span>
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
              {status.map((item: StatusCheckInfo, i) => (
                <StatusBar
                  key={i}
                  status={item.status}
                  time={item.finish_time}
                  className="w-1 h-8"
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
                  setChecking(!checking);
                  setStatusInfo(res.data);
                  setIsOpen(true);
                })
                .catch(() => {});
              setIsOpen(true);
            }}
          >
            Kiểm tra
          </BaseButton>
        </div>
      </div>

      <>
        <BaseModal isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className="bg-white  p-6 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              Thông tin trạng thái của dịch vụ
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
                  <StatusTag status={statusInfo?.status || "UNKNOWN"} />
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">
                  Response Time
                </span>
                <ResponseTimeTag response_time={statusInfo?.response_time} />
              </div>

              {statusInfo?.error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <MdOutlineWifiTetheringError />
                    <div className=" w-full">
                      <p className="text-sm font-medium text-red-800">Error</p>
                      <p className="text-xs text-red-700 mt-1 w-full">
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
