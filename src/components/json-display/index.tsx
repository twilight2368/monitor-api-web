import JsonFormatter from "react-json-formatter";

const jsonStyle = {
  propertyStyle: { color: "#005cc5" },
  stringStyle: { color: "#032f62" },
  numberStyle: { color: "#005cc5" },
  booleanStyle: { color: "#d73a49" },
  nullStyle: { color: "#6a737d" },
  punctuationStyle: { color: "#24292e" },
};

type JsonDisplayProps = {
  data: Record<string, any> | undefined;
};

const JsonDisplay = ({ data }: JsonDisplayProps) => {
  return <JsonFormatter json={data} tabWith={4} jsonStyle={jsonStyle} />;
};

export default JsonDisplay;
