"use client";
import { FC, Fragment, useState } from "react";
import data from "../data/data.json";
import Image from "next/image";
import MonsterModal from "./Modal/MonsterModal.tsx";

const Selection: FC<SelectionProps> = ({
  onArmorClick,
  onMonsterClick,
  selectedMonster,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skills: Skills = data.baseSetting.skills;

  const th = Object.values(data.baseSetting.parts).map((item) => {
    return (
      <th
        scope="col"
        className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200 "
        key={item}
      >
        <Image
          className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer] h-8 w-8 md:w-12 md:h-12"
          src={`/assets/icons/${item}.svg`}
          width={50}
          height={50}
          alt="equipment"
          loading="lazy"
        />
      </th>
    );
  });
  const renderEquipmentType = (armor: Armor, type: string) => {
    const equipArray = armor.equip[type] || [];
    return (
      <td
        scope="col"
        className="hover:bg-slate-800 border border-slate-200"
        key={type}
        onClick={() => {
          const equipArray = armor.equip[type] || [];
          if (equipArray.length === 0) {
            return; // 找不到就回傳以免報錯
          }
          onArmorClick(armor, type);
        }}
      >
        {equipArray.map((equipment, index) => (
          <div
            className="p-2 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
            key={index}
          >
            {equipment.skill && (
              <p className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer] text-sm md:text-base">
                {equipment.unlock} {skills[equipment.skill]?.name}{" "}
                {equipment.lv}
              </p>
            )}
          </div>
        ))}
      </td>
    );
  };
  //表格內容
  const armorRows = Object.values(data.equipSetting).map((armor: Armor) => (
    <tr className="z-0" key={armor.id}>
      <th
        scope="row"
        onClick={() => {
          onMonsterClick(armor);
          if (armor.name === "礦石" || armor.name === "皮製") {
            return setIsModalOpen(false);
          }
          setIsModalOpen(true);
        }}
        className="sticky left-0 border-r-2 bg-slate-700 px-2 py-2 font-bold text-center hover:bg-slate-800 border border-slate-200 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
      >
        <Image
          className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
          src={`/assets/icons/Monster/${armor.name}.svg`}
          width={60}
          height={60}
          alt="equipment"
          loading="lazy"
        />
        {armor.name}
      </th>
      <td className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200 text-center">
        {armor.unlock}
      </td>
      {renderEquipmentType(armor, "weapon")}
      {renderEquipmentType(armor, "helm")}
      {renderEquipmentType(armor, "mail")}
      {renderEquipmentType(armor, "gloves")}
      {renderEquipmentType(armor, "belt")}
      {renderEquipmentType(armor, "greaves")}
    </tr>
  ));
  return (
    <Fragment>
      <MonsterModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monsterData={selectedMonster}
      ></MonsterModal>
      <div className="max-w-sm sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-7xl mx-auto mt-4 mb-6 lg:mt-8 lg:mb-16 rounded-lg">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">魔物資訊</h1>
        <div className="relative overflow-auto  max-h-[40rem] w-full shadow-md">
          <table className="table-auto text-base text-left font-bold w-max lg:w-full text-slate-200 opacity-90 bg-slate-700 border-spacing-2 border border-slate-200 rounded-lg">
            <thead className="text-center sticky top-0 z-10 bg-slate-700 border-b-2">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200"
                >
                  種類
                </th>
                <th
                  scope="col"
                  className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200"
                >
                  等級
                </th>
                {th}
              </tr>
            </thead>
            <tbody>{armorRows}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default Selection;
