import { SKILL_LIST } from "../consts";
import { Attributes } from "../types";

type SkillsProps = {
  attributes: Attributes;
  skillPoints: Record<string, number>;
  setSkillPoints: (points: Record<string, number>) => void;
  totalPointsAvailable: number;
};

export const Skills = ({
  attributes,
  skillPoints,
  setSkillPoints,
  totalPointsAvailable,
}: SkillsProps) => {
  const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

  const getSkillModifier = (attribute: string) => {
    return calculateModifier(attributes[attribute as keyof Attributes]);
  };

  const updateSkillPoints = (skillName: string, change: number) => {
    const currentTotalSpent = Object.values(skillPoints).reduce(
      (sum, points) => sum + points,
      0
    );
    const newPoints = Math.max(0, (skillPoints[skillName] || 0) + change);
    const newTotalSpent = currentTotalSpent + change;

    if (change > 0 && newTotalSpent > totalPointsAvailable) {
      return;
    }

    setSkillPoints({
      ...skillPoints,
      [skillName]: newPoints,
    });
  };

  const totalPointsSpent = Object.values(skillPoints).reduce(
    (sum, points) => sum + points,
    0
  );

  return (
    <div>
      <h2 className="section-title">Skills</h2>
      <div>
        Total Points Available: {totalPointsAvailable - totalPointsSpent} /{" "}
        {totalPointsAvailable}
      </div>
      {SKILL_LIST.map((skill) => {
        const modifier = getSkillModifier(skill.attributeModifier);
        const points = skillPoints[skill.name] || 0;
        const total = points + modifier;

        return (
          <div key={skill.name} className="item">
            <span>
              {skill.name} - points: {points}
            </span>
            <button onClick={() => updateSkillPoints(skill.name, 1)}>+</button>
            <button onClick={() => updateSkillPoints(skill.name, -1)}>-</button>
            <span>
              modifier ({skill.attributeModifier}): {modifier} total: {total}
            </span>
          </div>
        );
      })}
    </div>
  );
};
