import { createService, getService } from "@/api/api";
import BaseButton from "@/components/elements/base-button";
import BaseModal from "@/components/elements/base-modal";
import ServiceForm from "@/components/service-form";
import ServiceInfoCompactDisplay from "@/components/service-info-display";
import { mockServices } from "@/mock";
import type { ServiceInfo } from "@/types/Services";
import React, { useEffect, useState } from "react";

const ServiceManagement = () => {
  const [data, setData] = useState<ServiceInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNeedReload, setIsNeedReload] = useState(false);

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
  }, [isNeedReload]);

  return (
    <>
      <div className="w-full min-h-96">
        <div className="w-full flex flex-row items-center justify-between mb-6">
          <div>
            <h1 className=" text-3xl ">Services</h1>
          </div>
          <div>
            <BaseButton
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add service
            </BaseButton>
          </div>
        </div>
        <div className="w-full space-y-3">
          {data.map((service, index) => {
            return <ServiceInfoCompactDisplay key={index} service={service} />;
          })}
        </div>
      </div>
      <>
        <BaseModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          size="xl"
          title="Add service"
        >
          <ServiceForm
            onSubmit={(data) => {
              // console.log("====================================");
              // console.log(data);
              // console.log("====================================");
              createService(data)
                .then((res) => {
                  setIsOpen(false);
                  setIsNeedReload(!isNeedReload);
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
    </>
  );
};

export default ServiceManagement;
