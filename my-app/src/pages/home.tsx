"use client";
import React, { FC, useState } from "react";
import ArmorSection from "@/components/ArmorSection";
import Selection from "@/components/Selection";

const HomePage: FC = () => {
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>(null); // 使用狀態來跟蹤選中的防具
  const handleArmorClick = (armor: Armor, equipKey: string) => {
    // 點擊時更新選中的防具
    setSelectedArmor({
      ...armor,
      equip: { [equipKey]: armor.equip[equipKey] },
      equipKey: equipKey,
    });
  };
  console.log(selectedArmor?.equip);
  return (
    <div>
      <ArmorSection armor={selectedArmor} />
      <Selection onArmorClick={handleArmorClick} />
    </div>
  );
};

export default HomePage;
