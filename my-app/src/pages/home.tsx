"use client";
import React, { FC, useState, Fragment } from "react";
import ArmorSection from "@/components/ArmorSection";
import Selection from "@/components/Selection";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import FieldIcon from "../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../public/assets/icons/monster_icon.svg";

const HomePage: FC = () => {
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

  const monsterHandler = (monster: Monster) => {
    setSelectedMonster(monster);
    setIsMonster(true);
  };

  return (
    <Fragment>
      <Tab.Group>
        <Tab.List className="max-w-7xl mx-auto flex my-4 bg-slate-400 p-1 rounded-md gap-4">
          <Tab className="monster-tab flex items-center gap-2">
            <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
            魔物裝備
          </Tab>
          <Tab className="monster-tab flex items-center gap-2">
            <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
            魔物地圖資訊
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ArmorSection armor={selectedArmors} />
            <Selection
              onArmorClick={handleArmorClick}
              onMonsterClick={monsterHandler}
              selectedMonster={selectedMonster}
            />
          </Tab.Panel>
          <Tab.Panel>
            <div className="max-w-7xl mx-auto">魔物地圖資訊</div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  );
};

export default HomePage;
