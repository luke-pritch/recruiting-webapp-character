import { useState } from "react";
import "./App.css";
import { Attributes as AttributesComponent } from "./components/Attributes";
import { Classes } from "./components/Classes";
import { Attributes } from "./types";

function App() {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet</h1>
      </header>
      <section className="App-section">
        <AttributesComponent
          attributes={attributes}
          setAttributes={setAttributes}
        />
        <Classes attributes={attributes} />
      </section>
    </div>
  );
}

export default App;
