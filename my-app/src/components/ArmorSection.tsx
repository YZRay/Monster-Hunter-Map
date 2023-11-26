import { FC, useState } from "react";
import Image from "next/image";
import data from "../data/data.json";
import { useTranslation } from "react-i18next";

const ArmorSection: FC<ArmorSectionProps> = ({ armor }) => {
  const { t } = useTranslation("monster");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (armor.length === 0) {
    return (
      <div className="container text-center p-4 my-2 lg:p-8 lg:my-4 rounded-md opacity-90 bg-slate-700">
        <p className="text-white text-base md:text-lg ">
          {t("ArmorSetting.click")}
        </p>
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
    <div className="container flex flex-col">
      <button
        className=" w-max justify-center rounded-md btn py-2 px-4 font-bold"
        onClick={toggleCollapse}
      >
        {isCollapsed
          ? `${t("ArmorSetting.watch")}`
          : `${t("ArmorSetting.hide")}`}
      </button>
      {!isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-2 mt-2 drop-shadow-[0_0px_35px_rgba(49, 158, 214, 0.3)]">
          {armor.map((equipment) => (
            <div
              key={equipment.key}
              className="flex w-full py-1 px-2 lg:py-2 lg:px-4 items-center gap-4 bg-gray-100 bg-opacity-90 border rounded-lg shadow-md"
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
                    {equip.unlock} {t("ArmorSetting.unlock")}
                    <br /> {skillName[equip.skill].name} Lv{equip.lv}
                  </p>
                ))
              ) : (
                <p className="mt-2 font-bold">{t("ArmorSetting.unknown")}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArmorSection;
