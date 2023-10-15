"use client";
import React, { FC, useState } from "react";
import ArmorSection from "@/components/ArmorSection";
import Selection from "@/components/Selection";

const HomePage: FC = () => {
  const [selectedArmors, setSelectedArmors] = useState<Armor[]>([]); // 使用狀態來跟蹤選中的防具
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

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

  const monsterHandler = (monster: Monster) => {
    setSelectedMonster(monster);
  };
  console.log(selectedMonster);

  return (
    <div className="">
      <ArmorSection armor={selectedArmors} />
      <Selection
        onArmorClick={handleArmorClick}
        onMonsterClick={monsterHandler}
        selectedMonster={selectedMonster}
      />
    </div>
  );
};

export default HomePage;
