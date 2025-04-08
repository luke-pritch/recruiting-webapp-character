import { useState } from "react";
import { SKILL_LIST } from "../consts";
import { Attributes } from "../types";

type SkillCheckProps = {
  attributes: Attributes;
  skillPoints: Record<string, number>;
};

export const SkillCheck = ({ attributes, skillPoints }: SkillCheckProps) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState<number | "">(10);
  const [rollResult, setRollResult] = useState<{
    random: number;
    success: boolean;
  } | null>(null);

  const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

  const getSkillModifier = (attribute: string) => {
    return calculateModifier(attributes[attribute as keyof Attributes]);
  };

  const handleRoll = () => {
    const skill = SKILL_LIST.find((s) => s.name === selectedSkill);
    if (!skill || dc === "") return;

    const modifier = getSkillModifier(skill.attributeModifier);
    const points = skillPoints[skill.name] || 0;
    const totalSkill = points + modifier;

    const random = Math.floor(Math.random() * 20) + 1; // Random number 1-20
    const total = totalSkill + random;
    const success = total >= Number(dc);

    setRollResult({ random, success });
  };

  return (
    <div>
      <h2 className="section-title">Skill Check</h2>
      <div className="item">
        <label>
          Skill:
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          DC:
          <input
            type="number"
            value={dc}
            onChange={(e) =>
              setDc(e.target.value ? Number(e.target.value) : "")
            }
            min="1"
          />
        </label>
        <button onClick={handleRoll}>Roll</button>
      </div>
      {rollResult && (
        <div className="details">
          <div>Random Roll: {rollResult.random}</div>
          <div>Result: {rollResult.success ? "Success" : "Failure"}</div>
        </div>
      )}
    </div>
  );
};
