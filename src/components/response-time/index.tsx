import classNames from "classnames";
import React from "react";

type ResponseTimeTagProps = {
  response_time: number | undefined;
};

const ResponseTimeTag: React.FC<ResponseTimeTagProps> = ({ response_time }) => {
  return (
    <>
      <span
        className={classNames(
          "font-medium",
          response_time
            ? response_time < 100
              ? "text-green-600"
              : response_time < 500
              ? "text-yellow-600"
              : "text-red-600"
            : "text-gray-600"
        )}
      >
        {response_time ? response_time : "NaN"} ms
      </span>
    </>
  );
};

export default ResponseTimeTag;
