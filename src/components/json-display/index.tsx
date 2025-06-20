import React from "react";

import JsonFormatter from "react-json-formatter";

const jsonStyle = {
  propertyStyle: { color: "#005cc5" },   // property names — blue
  stringStyle: { color: "#032f62" },     // strings — dark navy
  numberStyle: { color: "#005cc5" },     // numbers — same blue as property
  booleanStyle: { color: "#d73a49" },    // true/false — red
  nullStyle: { color: "#6a737d" },       // null — gray
  punctuationStyle: { color: "#24292e" } // brackets, commas — dark gray
};
type JsonDisplay = {
  data: Record<string, any>;
};

const JsonDisplay = ({ data }) => {
  return <JsonFormatter json={data} tabWith={4} jsonStyle={jsonStyle} />;
};

export default JsonDisplay;
