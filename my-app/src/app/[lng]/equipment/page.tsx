"use client";
import "../globals.css";
import React, { FC, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

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
  const [isArmorOpen, setIsArmorOpen] = useState(false);

  const handleArmorClick = (armor: Armor, key: string, armorKey: string) => {
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
        armorKey: armorKey,
      };

      setSelectedArmors(updatedArmors);
    } else {
      // 否則添加新的資料
      const newSelectedArmors = selectedArmors.concat({
        ...armor,
        equip: { [key]: armor.equip[key] },
        key: key,
        armorKey: armorKey,
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
          const skillHighLv: { [key: string]: number } = {};
          for (const skill of skillArray) {
            const { skill: skillName, lv } = skill;
            if (skillHighLv[skillName] === undefined)
              skillHighLv[skillName] = 0;
            if (skillHighLv[skillName] < lv) skillHighLv[skillName] = lv;
          }
          for (const skillkey in skillHighLv) {
            if (levels[skillkey] === undefined) levels[skillkey] = 0;

            levels[skillkey] += skillHighLv[skillkey];
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

  //手機板的時候武器資訊呈現
  const toggleArmorContent = () => {
    setIsArmorOpen(!isArmorOpen);
  };

  const ModalOverlay = () => (
    <div
      className={`flex xl:hidden fixed top-0 right-0 bottom-0 left-0 bg-slate-400 dark:bg-slate-950 opacity-50 z-30 transition-all duration-500`}
      onClick={() => toggleArmorContent()}
    />
  );

  return (
    <main className="flex gap-4 h-screen">
      <div
        className={`shadow-md fixed xl:relative overflow-y-auto h-screen col-span-auto flex flex-col gap-2 p-4 bg-slate-200 dark:bg-slate-900 top-0 transition-all duration-500 z-50 lg:left-0 ${
          isArmorOpen
            ? "left-0 max-w-[80%] lg:w-1/3"
            : "-left-full lg:w-[220px]"
        }`}
      >
        <ArmorSection armor={selectedArmors} isArmorOpen={isArmorOpen} />
        <SkillLevel skill={skillLevels} isArmorOpen={isArmorOpen} />
        <button
          className={`group absolute w-8 top-0 right-0  flex rounded-bl-lg bg-slate-400 shadow-md z-30 py-4 px-1`}
          onClick={toggleArmorContent}
        >
          <HiOutlineChevronDoubleRight
            className={`w-6 h-6 transition-all duration-300 ${
              isArmorOpen ? "rotate-180" : "rotate-0"
            } `}
          />
        </button>
      </div>
      <button
        className={`group fixed w-8 top-[50%] left-0 flex xl:hidden rounded-e-md bg-slate-400 shadow-md z-30 py-4 px-1`}
        onClick={toggleArmorContent}
      >
        <HiOutlineChevronDoubleRight className="w-6 h-6" />
      </button>
      <Selection
        onArmorClick={handleArmorClick}
        onMonsterClick={monsterHandler}
        selectedMonster={selectedMonster}
      />
      {isArmorOpen ? <ModalOverlay /> : <></>}
    </main>
  );
};

export default SelectionPage;
