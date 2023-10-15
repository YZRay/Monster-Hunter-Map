import { FC, Fragment, useState, useEffect } from "react";
import Image from "next/image";

const ArmorSection: FC<ArmorSectionProps> = ({ armor }) => {
  if (armor.length === 0) {
    return (
      <div className="max-w-7xl text-center mx-auto p-8 my-4 rounded-md opacity-80 bg-slate-700">
        <p className="text-white text-lg ">請點擊下方欄位</p>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      <h1 className="text-2xl font-bold mt-8">Title</h1>
      <div className="grid grid-cols-6 gap-2 mt-8 drop-shadow-[0_0px_35px_rgba(49, 158, 214, 0.3)]">
        {armor.map((equipment) => (
          <div
            key={equipment.key}
            className="flex flex-col items-center max-w-sm bg-white bg-opacity-80 border rounded-lg"
          >
            <div className="pt-4">
              <Image
                src={`/assets/icons/${equipment.key}.png`}
                width={30}
                height={30}
                alt="equipment"
                loading="lazy"
              />
            </div>
            <div className="my-2">
              {Object.values(equipment.equip).map((equipArray) =>
                equipArray.map((equip, index) => (
                  <div className="font-bold" key={index}>
                    <p className="mt-2" key={equip.skill}>
                      Skill:{equip.skill}
                    </p>
                    <p className="mt-2" key={equip.lv}>
                      LV: {equip.lv}
                    </p>
                    <p className="mt-2" key={equip.unlock}>
                      Unlock: {equip.unlock}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArmorSection;
