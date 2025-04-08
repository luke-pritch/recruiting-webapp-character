import { ATTRIBUTE_LIST } from "../consts";
import { Attributes as AttributesType } from "../types"; // type alias

type AttributesProps = {
  attributes: AttributesType;
  setAttributes: (attributes: AttributesType) => void;
};

export const Attributes = ({ attributes, setAttributes }: AttributesProps) => {
  const calculateModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  const updateAttribute = (attr: string, change: number) => {
    setAttributes({
      ...attributes,
      [attr]: Math.max(0, attributes[attr as keyof AttributesType] + change),
    });
  };

  return (
    <div>
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr} style={{ margin: "10px" }}>
          {attr}: {attributes[attr as keyof AttributesType]}
          <button onClick={() => updateAttribute(attr, 1)}>+</button>
          <button onClick={() => updateAttribute(attr, -1)}>-</button>
          <span>
            {" "}
            Modifier:{" "}
            {calculateModifier(attributes[attr as keyof AttributesType])}
          </span>
        </div>
      ))}
    </div>
  );
};
