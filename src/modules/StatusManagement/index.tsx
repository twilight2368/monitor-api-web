import StatusInfoDisplay from "@/components/status-info-display";
import { useServicesContext } from "@/context/service-context/ServicesContext";

const StatusManagement = () => {
  const { services } = useServicesContext();

  return (
    <>
      <div className="w-full min-h-96">
        <div className="w-full mb-6">
          <h1 className=" text-3xl ">Trạng thái của dịch vụ</h1>
        </div>
        <div className="w-full grid grid-cols-3 gap-6">
          {services.map((service) => (
            <StatusInfoDisplay key={service.id} service={service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default StatusManagement;
