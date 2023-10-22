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
      <th scope="col" className="px-6 py-3 border border-slate-200" key={item}>
        <Image
          className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
          src={`/assets/icons/${item}.svg`}
          width={50}
          height={50}
          alt="equipment"
          loading="lazy"
        />
      </th>
    );
  });

  //表格內容
  const armorRows = Object.values(data.equipSetting).map((armor: Armor) => (
    <tr className="" key={armor.id}>
      <th
        scope="row"
        onClick={() => {
          onMonsterClick(armor);
          if (armor.name === "礦石" || armor.name === "皮製") {
            return setIsModalOpen(false);
          }
          setIsModalOpen(true);
        }}
        className="px-2 py-2 font-bold text-center hover:bg-slate-800 border border-slate-200 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
      >
        <Image
          className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
          src={`/assets/icons/Monster/${armor.name}.svg`}
          width={80}
          height={80}
          alt="equipment"
          loading="lazy"
        />
        {armor.name}
      </th>
      <td className="px-6 py-4 border border-slate-200 text-center">
        {armor.unlock}
      </td>
      {Object.entries(armor.equip).map(([equipKey, equipArray]) => (
        <td
          className="hover:bg-slate-800 border border-slate-200"
          key={equipKey}
          onClick={() => onArmorClick(armor, equipKey)}
        >
          {equipArray.map((equipment: Equipment, index: number) => (
            <div
              className="p-2 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
              key={index}
            >
              {equipment.skill && (
                <p className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
                  {equipment.unlock} {skills[equipment.skill]?.name}{" "}
                  {equipment.lv}
                </p>
              )}
            </div>
          ))}
        </td>
      ))}
    </tr>
  ));

  return (
    <Fragment>
      <MonsterModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monsterData={selectedMonster}
      ></MonsterModal>
      <div className="max-w-7xl mx-auto mt-4 mb-16 rounded-lg">
        <h2 className="my-8 text-xl font-bold">裝備資訊</h2>
        <div className="relative overflow-x-auto shadow-md">
          <table className="table-auto text-base text-left w-full font-bol text-slate-200 opacity-90 bg-slate-700 border-spacing-2 border border-slate-200 rounded-lg">
            <thead className="text-center">
              <tr>
                <th scope="col" className="px-6 py-3 border border-slate-200">
                  種類
                </th>
                <th scope="col" className="px-6 py-3 border border-slate-200">
                  解鎖等級
                </th>
                {th}
              </tr>
            </thead>
            <tbody className="">{armorRows}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default Selection;
