import { useState } from "react";
import { CLASS_LIST, ATTRIBUTE_LIST } from "../consts";
import { Attributes } from "../types";

type ClassesProps = {
  attributes: Attributes;
};

export const Classes = ({ attributes }: ClassesProps) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const meetsClassRequirements = (className: keyof typeof CLASS_LIST) => {
    const classRequirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every(
      (attr) =>
        attributes[attr as keyof Attributes] >=
        classRequirements[attr as keyof typeof classRequirements]
    );
  };

  const handleClassClick = (className: string) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  return (
    <div>
      <h2 className="section-title">Classes</h2>
      {Object.keys(CLASS_LIST).map((className) => (
        <div key={className}>
          <div
            onClick={() => handleClassClick(className)}
            className="item clickable"
            style={{
              backgroundColor: meetsClassRequirements(
                className as keyof typeof CLASS_LIST
              )
                ? "green"
                : "transparent",
            }}
          >
            {className}
          </div>
          {selectedClass === className && (
            <div className="details">
              <h3>Minimum Requirements for {className}</h3>
              {Object.entries(
                CLASS_LIST[className as keyof typeof CLASS_LIST]
              ).map(([attr, value]) => (
                <div key={attr}>
                  {attr}: {value}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
