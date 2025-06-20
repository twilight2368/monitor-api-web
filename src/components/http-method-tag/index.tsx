import React from "react";
import BaseTag from "../elements/base-tag";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

type HttpMethodTagProps = {
  method: HttpMethod;
  className?: string;
};

const methodColors: Record<
  HttpMethod,
  "primary" | "success" | "warning" | "danger" | "secondary"
> = {
  GET: "primary",
  POST: "success",
  PUT: "warning",
  DELETE: "danger",
  PATCH: "secondary",
  OPTIONS: "secondary",
  HEAD: "secondary",
};

const HttpMethodTag: React.FC<HttpMethodTagProps> = ({ method, className }) => {
  return (
    <BaseTag
      variant="flat"
      color={methodColors[method]}
      size="sm"
      radius="sm"
      className={className}
    >
      {method}
    </BaseTag>
  );
};

export default HttpMethodTag;
