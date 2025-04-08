import { useState } from "react";
import "./App.css";
import { Attributes as AttributesComponent } from "./components/Attributes";
import { Classes } from "./components/Classes";
import { Skills } from "./components/Skills";
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

  const [skillPoints, setSkillPoints] = useState<Record<string, number>>({});

  const calculateModifier = (value: number) => Math.floor((value - 10) / 2);
  const intelligenceModifier = calculateModifier(attributes.Intelligence);
  const totalPointsAvailable = 10 + 4 * intelligenceModifier;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet</h1>
      </header>
      <section className="App-section">
        <div className="container">
          <AttributesComponent
            attributes={attributes}
            setAttributes={setAttributes}
          />
          <Classes attributes={attributes} />
          <Skills
            attributes={attributes}
            skillPoints={skillPoints}
            setSkillPoints={setSkillPoints}
            totalPointsAvailable={totalPointsAvailable}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
