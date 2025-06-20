import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
} from "@heroui/react";
import type { ServiceInfo } from "@/types/Services";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

type ServiceFormProps = {
  initValues?: ServiceInfo;
  onSubmit: (data: ServiceInfo) => void;
  submitButtonDisplay?: string;
};

type FormProps = {
  id: number;
  name: string;
  url: string;
  method: string;
  timeout: number;
  cron: string;
  data: string;
  cookies: string;
};

const ServiceForm: React.FC<ServiceFormProps> = ({
  initValues,
  onSubmit,
  submitButtonDisplay = "Submit",
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    defaultValues: {
      name: initValues?.name ?? "",
      url: initValues?.url ?? "",
      method: initValues?.method ?? "GET",
      timeout: initValues?.timeout ?? 5,
      cron: initValues?.cron ?? "",
      data: JSON.stringify(initValues?.data ?? {}, null, 2),
      cookies: JSON.stringify(initValues?.cookies ?? {}, null, 2),
    },
  });

  const submit = async (values: any) => {
    try {
      onSubmit({
        ...values,
        timeout: Number(values.timeout),
        data: JSON.parse(values.data || "{}"),
        cookies: JSON.parse(values.cookies || "{}"),
      });
    } catch {
      alert("Invalid JSON in Payload or Cookies.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)} className="space-y-6">
      {/* Service Name */}
      <div className="space-y-1  w-full">
        <label className="text-sm font-medium">Service Name</label>
        <Input
          required
          {...register("name", { required: "Name is required" })}
          placeholder="e.g. My API Service"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* URL */}
      <div className="space-y-1  w-full">
        <label className="text-sm font-medium">URL</label>

        <Input
          required
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Invalid URL format",
            },
          })}
          placeholder="https://example.com/api"
        />
        {errors.url && (
          <p className="text-xs text-red-500">{errors.url.message}</p>
        )}
      </div>

      {/* HTTP Method */}
      <div className="space-y-1 w-full">
        <label className="text-sm font-medium">HTTP Method</label>
        <Controller
          name="method"
          control={control}
          render={({ field }) => (
            <Select
              required
              selectedKeys={[field.value]} // ensures the initial value is selected
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            >
              {HTTP_METHODS.map((method) => (
                <SelectItem key={method}>{method}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      {/* Timeout */}
      <div className="space-y-1  w-full">
        <label className="text-sm font-medium">Timeout (seconds)</label>
        <Input
          type="number"
          min={1}
          {...register("timeout", {
            valueAsNumber: true,
            min: { value: 1, message: "Minimum is 1 second" },
          })}
        />
        {errors.timeout && (
          <p className="text-xs text-red-500">{errors.timeout.message}</p>
        )}
      </div>

      {/* Cron */}
      <div className="space-y-1 w-full">
        <label className="text-sm font-medium">
          Cron Expression
        </label>
        <Input
          {...register("cron", {
            required: "Cron is required",
          })}
          required
          placeholder="e.g. */5 * * * *"
        />
      </div>

      {/* Payload */}
      <div className="space-y-1  w-full">
        <label className="text-sm font-medium">Payload (JSON)</label>
        <Textarea
          {...register("data")}
          placeholder='{ "key": "value" }'
          minRows={3}
        />
      </div>

      {/* Cookies */}
      <div className="space-y-1  w-full">
        <label className="text-sm font-medium">Cookies (JSON)</label>
        <Textarea
          {...register("cookies")}
          placeholder='{ "session": "abc123" }'
          minRows={2}
        />
      </div>

      {/* Submit Button */}
      <div className="pb-12 w-full">
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          fullWidth
        >
          {submitButtonDisplay}
        </Button>
      </div>
    </Form>
  );
};

export default ServiceForm;
