"use client";
import React, { FC, useState, Fragment } from "react";
import ArmorSection from "@/components/ArmorSection";
import Selection from "@/components/Selection";
import MapSelection from "@/components/MapSelection";
import SkillLevel from "@/components/SkillLevel";
import { Tab, Transition } from "@headlessui/react";
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
  const skillLevels: SkillLevels = {};
  selectedArmors.forEach((armor) => {
    const { equip } = armor;
    for (const key in equip) {
      if (equip.hasOwnProperty(key)) {
        const skillArray = equip[key];
        for (const skill of skillArray) {
          const { skill: skillName, lv } = skill;
          if (
            skillLevels[skillName] === undefined ||
            lv > skillLevels[skillName]
          ) {
            skillLevels[skillName] = lv;
          }
        }
      }
    }
  });

  const monsterHandler = (monster: Monster) => {
    setSelectedMonster(monster);
    setIsMonster(true);
  };

  return (
    <Fragment>
      <Tab.Group>
        <Tab.List className="container flex my-4 bg-slate-400 p-1 rounded-md gap-1 md:gap-4 top-0 z-30 shadow-lg bg-opacity-95">
          <Tab className="monster-tab flex items-center md:gap-2 text-lg">
            <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
            地圖資訊
          </Tab>
          <Tab className="monster-tab flex items-center gap-2 text-lg">
            <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
            魔物資訊
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="container">
              <MapSelection />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <ArmorSection armor={selectedArmors} />
            <SkillLevel skill={skillLevels} />
            <Selection
              onArmorClick={handleArmorClick}
              onMonsterClick={monsterHandler}
              selectedMonster={selectedMonster}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  );
};

export default HomePage;
