import { FC, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import data from "../data/data.json";

const ArmorSection: FC<ArmorSectionProps> = ({ armor }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (armor.length === 0) {
    return (
      <div className="max-w-sm sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-7xl text-center mx-auto p-4 my-2 lg:p-8 lg:my-4 rounded-md opacity-90 bg-slate-700">
        <p className="text-white text-base md:text-lg ">請點擊下方欄位</p>
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
    <div className="max-w-sm sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-7xl mx-auto flex flex-col">
      <button
        className=" w-max justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer] bg-slate-400 py-2 px-4 text-white font-bold hover:bg-slate-800 duration-300"
        onClick={toggleCollapse}
      >
        {isCollapsed ? "查看武器" : "收起武器資訊"}
      </button>
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-2 mt-2 drop-shadow-[0_0px_35px_rgba(49, 158, 214, 0.3)]">
          {armor.map((equipment) => (
            <div
              key={equipment.key}
              className="flex flex-row xl:flex-col py-1 px-2 lg:py-2 lg:px-4 items-center justify-around max-w-sm bg-gray-100 bg-opacity-90 border rounded-lg shadow-md"
            >
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={`/assets/icons/${equipment.key}.svg`}
                  width={50}
                  height={50}
                  alt="equipment"
                  loading="lazy"
                  className="w-8 h-8 md:w-12 md:h-12"
                />
                <span className="font-bold text-sm lg:text-base text-gray-800">
                  {equipment.name}
                  {equipment.key && armorName[equipment.key]}
                </span>
              </div>
              {equipment.key && armorName[equipment.key] ? (
                equipment.equip[equipment.key]?.map((equip, index) => (
                  <p
                    className="mt-2 font-bold text-left text-sm lg:text-base"
                    key={index}
                  >
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
      )}
    </div>
  );
};

export default ArmorSection;
