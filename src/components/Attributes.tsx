import { ATTRIBUTE_LIST } from "../consts";
import { Attributes as AttributesType } from "../types";

type AttributesProps = {
  attributes: AttributesType;
  setAttributes: (attributes: AttributesType) => void;
};

export const Attributes = ({ attributes, setAttributes }: AttributesProps) => {
  const calculateModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  const updateAttribute = (attr: string, change: number) => {
    const currentValue = attributes[attr as keyof AttributesType];
    const newValue = currentValue + change;

    if (newValue < 0 || newValue > 70) {
      return;
    }

    setAttributes({
      ...attributes,
      [attr]: newValue,
    });
  };

  return (
    <div>
      <h2 className="section-title">Attributes</h2>
      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr} className="item">
          <span>
            {attr}: {attributes[attr as keyof AttributesType]}
          </span>
          <button onClick={() => updateAttribute(attr, 1)}>+</button>
          <button onClick={() => updateAttribute(attr, -1)}>-</button>
          <span>
            Modifier:{" "}
            {calculateModifier(attributes[attr as keyof AttributesType])}
          </span>
        </div>
      ))}
    </div>
  );
};
