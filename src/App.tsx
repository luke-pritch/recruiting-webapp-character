import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Attributes as AttributesComponent } from "./components/Attributes";
import { Classes } from "./components/Classes";
import { Skills } from "./components/Skills";
import { SkillCheck } from "./components/SkillCheck";
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

  const githubUsername =
    process.env.REACT_APP_GITHUB_USERNAME || "default_user";
  const apiUrl = `https://recruiting.verylongdomaintotestwith.ca/api/{${githubUsername}}/character`;

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        if (data.attributes) setAttributes(data.attributes);
        if (data.skillPoints) setSkillPoints(data.skillPoints);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };
    fetchCharacterData();
  }, [apiUrl]);

  useEffect(() => {
    const saveCharacterData = async () => {
      try {
        await axios.post(
          apiUrl,
          { attributes, skillPoints },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Error saving character data:", error);
      }
    };
    saveCharacterData();
  }, [attributes, skillPoints, apiUrl]);

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
          <SkillCheck attributes={attributes} skillPoints={skillPoints} />
        </div>
      </section>
    </div>
  );
}

export default App;
