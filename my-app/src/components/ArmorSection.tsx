import { FC, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import data from "../data/data.json";

const ArmorSection: FC<ArmorSectionProps> = ({ armor }) => {
  if (armor.length === 0) {
    return (
      <div className="max-w-7xl text-center mx-auto p-8 my-4 rounded-md opacity-90 bg-slate-700">
        <p className="text-white text-lg ">請點擊下方欄位</p>
      </div>
    );
  }

  const skillName: Skills = data.baseSetting.skills;
  const armorName: ArmorName = data.baseSetting.parts;
  armor.sort((a, b) => {
    const order = ["weapon", "helm", "mail", "gloves", "belt", "greaves"];

    const aKey = a.key || "";
    const bKey = b.key || "";

    return order.indexOf(aKey) - order.indexOf(bKey);
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      <h1 className="text-2xl font-bold mt-2 text-gray-800">裝備技能一覽</h1>
      <div className="grid grid-cols-6 gap-2 mt-2 drop-shadow-[0_0px_35px_rgba(49, 158, 214, 0.3)]">
        {armor.map((equipment) => (
          <div
            key={equipment.key}
            className="flex flex-col py-2 px-6 max-w-sm bg-gray-100 bg-opacity-90 border rounded-lg shadow-md"
          >
            <div className="flex flex-col items-center gap-1">
              <Image
                src={`/assets/icons/${equipment.key}.svg`}
                width={50}
                height={50}
                alt="equipment"
                loading="lazy"
              />
              <span className="font-bold text-gray-800">
                {equipment.name}
                {equipment.key && armorName[equipment.key]}
              </span>
            </div>
            {equipment.key && armorName[equipment.key] ? (
              equipment.equip[equipment.key]?.map((equip, index) => (
                <p className="mt-2 font-bold text-left" key={index}>
                  {equip.unlock} 等解鎖
                  <br /> {skillName[equip.skill].name} Lv{equip.lv}
                </p>
              ))
            ) : (
              <p className="mt-2 font-bold">未知</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmorSection;
