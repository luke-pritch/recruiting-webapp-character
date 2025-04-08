import { CLASS_LIST, ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";

type ClassesProps = {
  attributes: Attributes;
};

export const Classes = ({ attributes }: ClassesProps) => {
  const meetsClassRequirements = (className: keyof typeof CLASS_LIST) => {
    const classRequirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every(
      (attr) =>
        attributes[attr as keyof Attributes] >=
        classRequirements[attr as keyof typeof classRequirements]
    );
  };

  return (
    <div>
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((className) => (
        <div
          key={className}
          style={{
            margin: "10px",
            padding: "5px",
            backgroundColor: meetsClassRequirements(
              className as keyof typeof CLASS_LIST
            )
              ? "green"
              : "transparent",
          }}
        >
          {className}
        </div>
      ))}
    </div>
  );
};
