import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST } from "./consts";

function App() {
  const [attributes, setAttributes] = useState({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  const calculateModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  const updateAttribute = (attr: string, change: number) => {
    setAttributes((prev) => ({
      ...prev,
      [attr]: Math.max(0, prev[attr as keyof typeof attributes] + change), // Prevent negative values
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet</h1>
      </header>
      <section className="App-section">
        <h2>Attributes</h2>
        {ATTRIBUTE_LIST.map((attr) => (
          <div key={attr} style={{ margin: "10px" }}>
            {attr}: {attributes[attr as keyof typeof attributes]}
            <button onClick={() => updateAttribute(attr, 1)}>+</button>
            <button onClick={() => updateAttribute(attr, -1)}>-</button>
            <span>
              {" "}
              Modifier:{" "}
              {calculateModifier(attributes[attr as keyof typeof attributes])}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
