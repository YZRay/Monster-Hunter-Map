interface Equipment {
  unlock: number;
  skill: string;
  lv: number;
}

interface Armor {
  id: number;
  name: string;
  unlock: number;
  equipKey?: string;
  equip: {
    [key: string]: Equipment[any];
  };
}

interface ArmorSectionProps {
  armor: Armor | null;
  qeuipKey?: string;
}

interface SelectionProps {
  onArmorClick: (armor: Armor, equipKey: string) => void;
}
