import { createService, getService } from "@/api/api";
import BaseButton from "@/components/elements/base-button";
import BaseModal from "@/components/elements/base-modal";
import ServiceForm from "@/components/service-form";
import ServiceInfoCompactDisplay from "@/components/service-info-display";
import { useServicesContext } from "@/context/service-context/ServicesContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ServiceManagement = () => {
  const { services, setServices } = useServicesContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isNeedReload, setIsNeedReload] = useState(false);

  useEffect(() => {
    getService()
      .then((res) => {
        setServices(res.data);
        // console.log("====================================");
        // console.log(res.data);
        // console.log("====================================");
      })
      .catch(() => {
        toast.error("Lấy dữ liệu thất bại ...");
      });
  }, [isNeedReload]);

  return (
    <>
      <div className="w-full min-h-96">
        <div className="w-full flex flex-row items-center justify-between mb-6">
          <div>
            <h1 className=" text-3xl ">Các dịch vụ</h1>
          </div>
          <div>
            <BaseButton
              variant="solid"
              color="primary"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Thêm dịch vụ
            </BaseButton>
          </div>
        </div>
        <div className="w-full space-y-3">
          {services.map((service, index) => {
            return (
              <ServiceInfoCompactDisplay
                key={index}
                service={service}
                actionAfterUpdate={() => {
                  setIsNeedReload(!isNeedReload);
                }}
              />
            );
          })}
        </div>
      </div>
      <>
        <BaseModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          size="xl"
          title="Thêm dịch vụ"
        >
          <ServiceForm
            onSubmit={(data) => {
              // console.log("====================================");
              // console.log(data);
              // console.log("====================================");
              createService(data)
                .then(() => {
                  setIsOpen(false);
                  toast.success("Thêm dịch vụ thành công!");
                  setIsNeedReload(!isNeedReload);
                })
                .catch(() => {
                  // console.log("====================================");
                  // console.log(err);
                  // console.log("====================================");
                  toast.error("Tạo dịch vụ không thành công!");
                });
            }}
          />
        </BaseModal>
      </>
    </>
  );
};

export default ServiceManagement;
