interface Equipment {
  unlock: number;
  skill: string;
  lv: number;
}

interface Armor {
  id: number;
  name: string;
  unlock: number;
  equip: {
    [key: string]: Equipment[];
  };
  key?: string;
}

interface Monster {
  id: number;
  name: string;
  unlock: number;
}
interface ArmorSectionProps {
  armor: Armor[];
  qeuipKey?: string;
}

interface SelectionProps {
  onArmorClick: (armor: Armor, equipKey: string) => void;
  onMonsterClick: (monster: Monster) => void;
  selectedMonster: Monster | null;
}

interface Skills {
  [key: string]: { name: string; content: string[] };
}

type SkillLevels = {
  [skillName: string]: number;
};
type SkillLevelProps = {
  skill: SkillLevels;
};
