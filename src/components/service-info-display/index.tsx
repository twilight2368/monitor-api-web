import type { ServiceInfo } from "@/types/Services";
import React, { useState } from "react";
import HttpMethodTag from "../http-method-tag";
import BaseButton from "../elements/base-button";
import { FaPlus, FaMinus, FaPen, FaTrash } from "react-icons/fa6";
import JsonDisplay from "../json-display";
import { Snippet } from "@heroui/react";
import BaseModal from "../elements/base-modal";
import ServiceForm from "../service-form";
import { deleteService, updateService } from "@/api/api";
import { ServiceMapper } from "@/utils/mapper/ServiceMapper";
import type { ServiceInfoResponse } from "@/types/ServiceRes";

type ServiceInfoCompactDisplayProps = {
  service: ServiceInfo;
};

const ServiceInfoCompactDisplay: React.FC<ServiceInfoCompactDisplayProps> = ({
  service,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm">
      {/* Header row: Name and Cron */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-xl font-bold">{service?.name}</span>
        {service?.cron && (
          <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">
            {service?.cron}
          </span>
        )}
      </div>

      {/* URL and Actions */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-mono">
          <HttpMethodTag method={service?.method} />
          <span className="text-gray-800 break-all">{service?.url}</span>
        </div>
        <div className="flex gap-2">
          <BaseButton
            size="sm"
            variant="light"
            color={showDetails ? "danger" : "primary"}
            isIconOnly
            onClick={() => setShowDetails((prev) => !prev)}
          >
            {showDetails ? <FaMinus /> : <FaPlus />}
          </BaseButton>
          <BaseButton
            size="sm"
            isIconOnly
            variant="ghost"
            color="primary"
            onPress={() => {
              setIsOpen(true);
            }}
          >
            <FaPen />
          </BaseButton>
          <BaseButton
            size="sm"
            isIconOnly
            variant="ghost"
            color="danger"
            onPress={() => {
              deleteService(service.id)
                .then((res) => {
                  console.log("====================================");
                  console.log(res.data);
                  console.log("====================================");
                })
                .catch(() => {});
            }}
          >
            <FaTrash />
          </BaseButton>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="mt-2 bg-gray-50 p-3 rounded text-sm text-gray-700 space-y-2 font-mono">
          <div>
            <strong>Timeout:</strong> {service?.timeout}s
          </div>
          <div>
            <strong>Data:</strong>
            <div className="w-full">
              <Snippet hideSymbol className="w-full max-h-96 overflow-y-auto">
                <JsonDisplay data={service?.data} />
              </Snippet>
            </div>
          </div>
          <div>
            <strong>Cookies:</strong>
            <div className="w-full">
              <Snippet hideSymbol className="w-full max-h-96 overflow-y-auto">
                <JsonDisplay data={service?.cookies} />
              </Snippet>
            </div>
          </div>
        </div>
      )}

      <>
        <BaseModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Update service"
          size="xl"
        >
          <ServiceForm
            initValues={service}
            onSubmit={(form_data) => {
              // console.log("====================================");
              // console.log(form_data);
              // console.log("====================================");
              updateService(service.id, form_data)
                .then((res) => {
                  console.log("====================================");
                  console.log("Update", res.data);
                  console.log("====================================");
                  setIsOpen(false);
                })
                .catch((err) => {
                  console.log("====================================");
                  console.log(err);
                  console.log("====================================");
                });
            }}
          />
        </BaseModal>
      </>
    </div>
  );
};

export default ServiceInfoCompactDisplay;
