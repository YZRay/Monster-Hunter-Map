"use client";
import { FC, useState } from "react";
import data from "../data/data.json";
import Image from "next/image";

const Selection: FC<SelectionProps> = ({ onArmorClick }) => {
  const th = Object.values(data.baseSetting.parts).map((item) => {
    return (
      <th scope="col" className="px-6 py-3 bg-gray-50" key={item}>
        {item}
      </th>
    );
  });

  //表格內容
  const armorRows = Object.values(data.equipSetting).map((armor: Armor) => (
    <tr className="odd:bg-teal-500  odd:text-slate-50" key={armor.id}>
      <th scope="row" className="px-6 py-4  font-bold">
        {armor.name}
      </th>
      <td className="px-6 py-4">{armor.unlock}</td>
      {Object.entries(armor.equip).map(([equipKey, equipArray]) => (
        <td
          className="hover:bg-teal-700"
          key={equipKey}
          onClick={() => onArmorClick(armor, equipKey)}
        >
          {equipArray.map((equipment: Equipment, index: number) => (
            <div className="p-2 " key={index}>
              <p>Unlock: {equipment.unlock}</p>
              <p>Skill: {equipment.skill}</p>
              <p>Level: {equipment.lv}</p>
            </div>
          ))}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="max-w-6xl mx-auto mt-4 mb-16 rounded-md">
      <h2 className="my-8 text-xl font-bold">Title</h2>
      <div className="relative overflow-x-auto shadow-md ">
        <table className="table-auto border-separate text-md text-left font-bold text-gray-700 ">
          <thead className="text-md">
            <tr>
              <th scope="col" className=" px-6 py-3 bg-gray-50">
                種類
              </th>
              <th scope="col" className=" px-6 py-3 bg-gray-50">
                解鎖等級
              </th>
              {th}
            </tr>
          </thead>
          <tbody>{armorRows}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Selection;
