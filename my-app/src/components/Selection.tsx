"use client";
import { FC, useState } from "react";
import data from "../data/data.json";
import Image from "next/image";

const Selection: FC<SelectionProps> = ({ onArmorClick, onMonsterClick }) => {
  const th = Object.values(data.baseSetting.parts).map((item) => {
    return (
      <th scope="col" className="px-6 py-3" key={item}>
        {item}
      </th>
    );
  });

  //表格內容
  const armorRows = Object.values(data.equipSetting).map((armor: Armor) => (
    <tr className="" key={armor.id}>
      <th
        scope="row"
        onClick={() => onMonsterClick(armor)}
        className="px-2 py-2 font-bold text-center hover:bg-slate-800 hover:border-y-green-900"
      >
        <Image
          src={`/assets/icons/${armor.name}.svg`}
          width={80}
          height={80}
          alt="equipment"
        />
        {armor.name}
      </th>
      <td className="px-6 py-4">{armor.unlock}</td>
      {Object.entries(armor.equip).map(([equipKey, equipArray]) => (
        <td
          className="hover:bg-slate-800 hover:border-y-green-900"
          key={equipKey}
          onClick={() => onArmorClick(armor, equipKey)}
        >
          {equipArray.map((equipment: Equipment, index: number) => (
            <div
              className="p-2 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
              key={index}
            >
              <p className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
                Unlock: {equipment.unlock}
              </p>
              <p className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
                Skill: {equipment.skill}
              </p>
              <p className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
                Level: {equipment.lv}
              </p>
            </div>
          ))}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="max-w-7xl mx-auto mt-4 mb-16 rounded-md">
      <h2 className="my-8 text-xl font-bold">Title</h2>
      <div className="relative overflow-x-auto shadow-md ">
        <table className="table-auto border-separate text-md text-left font-bol text-slate-200 opacity-90 bg-slate-700">
          <thead className="text-md">
            <tr>
              <th scope="col" className=" px-6 py-3">
                種類
              </th>
              <th scope="col" className=" px-6 py-3">
                解鎖等級
              </th>
              {th}
            </tr>
          </thead>
          <tbody className="">{armorRows}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Selection;
