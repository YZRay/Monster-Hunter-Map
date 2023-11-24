"use client";
import "../globals.css";
import React, { FC, useState, Fragment, useMemo } from "react";
import dynamic from "next/dynamic";

const Selection = dynamic(() => import("@/components/Selection"), {
  ssr: false,
});
const ArmorSection = dynamic(() => import("@/components/ArmorSection"), {
  ssr: false,
});
const SkillLevel = dynamic(() => import("@/components/SkillLevel"), {
  ssr: false,
});
const SelectionPage: FC = () => {
  const [selectedArmors, setSelectedArmors] = useState<Armor[]>([]); // 使用狀態來跟蹤選中的防具
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [isMonster, setIsMonster] = useState(false);

  const handleArmorClick = (armor: Armor, key: string) => {
    // 檢查是否已經存在相同 key 的資料
    const existingIndex = selectedArmors.findIndex(
      (selectedArmor) => selectedArmor.key === key
    );

    if (existingIndex !== -1) {
      // 如果已存在相同 key 的資料，則更新它
      const updatedArmors = [...selectedArmors];
      updatedArmors[existingIndex] = {
        ...armor,
        equip: { [key]: armor.equip[key] },
        key: key,
      };
      setSelectedArmors(updatedArmors);
    } else {
      // 否則添加新的資料
      const newSelectedArmors = selectedArmors.concat({
        ...armor,
        equip: { [key]: armor.equip[key] },
        key: key,
      });
      setSelectedArmors(newSelectedArmors);
    }
  };
  // 計算技能等級
  const skillLevels = useMemo(() => {
    const levels: SkillLevels = {};

    selectedArmors.forEach((armor) => {
      const { equip } = armor;
      for (const key in equip) {
        if (equip.hasOwnProperty(key)) {
          const skillArray = equip[key];
          for (const skill of skillArray) {
            const { skill: skillName, lv } = skill;
            if (levels[skillName] === undefined) {
              levels[skillName] = 0;
            }
            levels[skillName] += lv;
          }
        }
      }
    });
    return levels;
  }, [selectedArmors]);
  const monsterHandler = (monster: Monster) => {
    setSelectedMonster(monster);
    setIsMonster(true);
  };

  return (
    <Fragment>
      <ArmorSection armor={selectedArmors} />
      <SkillLevel skill={skillLevels} />
      <Selection
        onArmorClick={handleArmorClick}
        onMonsterClick={monsterHandler}
        selectedMonster={selectedMonster}
      />
    </Fragment>
  );
};

export default SelectionPage;
