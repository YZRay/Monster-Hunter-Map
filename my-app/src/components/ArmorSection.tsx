import { FC, useState } from "react";
import Image from "next/image";
import data from "../data/data.json";
import { useTranslation } from "react-i18next";

const ArmorSection: FC<ArmorSectionProps> = ({ armor, isArmorOpen }) => {
  const { t } = useTranslation("monster");
  const { t: equipName } = useTranslation("data");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (armor.length === 0) {
    return (
      <div className="w-full text-center p-4 my-2 lg:p-8 lg:my-4 rounded-md opacity-90 bg-slate-700">
        <p className="{text-white text-base md:text-lg transition-all duration-300">
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
    <div className="flex flex-col">
      <button
        className=" w-max justify-center rounded-md btn py-2 px-4 font-bold"
        onClick={toggleCollapse}
      >
        {isCollapsed
          ? `${t("ArmorSetting.watch")}`
          : `${t("ArmorSetting.hide")}`}
      </button>
      {!isCollapsed && (
        <div className="grid grid-cols-auto xl:grid-cols-1 gap-1 md:gap-2 mt-2 drop-shadow-[0_0px_35px_rgba(49, 158, 214, 0.3)]">
          {armor.map((equipment) => (
            <div
              key={equipment.key}
              className={`flex w-full py-1 px-2 lg:py-2 lg:px-4 items-center bg-gray-100 dark:bg-slate-600 bg-opacity-90 border border-transparent dark:border-slate-300/50 rounded-lg shadow-md ${
                isArmorOpen ? "justify-between" : "justify-center"
              }`}
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
                <span className="font-bold text-sm lg:text-base text-gray-800 dark:text-gray-300">
                  {equipName(`equipSetting.${equipment.armorKey}.name`)}
                  {equipment.key &&
                    equipName(`baseSetting.parts.${equipment.key}`)}
                </span>
              </div>
              {equipment.key && armorName[equipment.key] ? (
                equipment.equip[equipment.key]?.map((equip, index) => (
                  <p
                    className={`mt-2 font-bold text-left text-sm lg:text-base transition-opacity  duration-300 ease-in-out ${
                      isArmorOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible w-0 h-0"
                    }
                    }`}
                    key={index}
                  >
                    {equip.unlock} {t("ArmorSetting.unlock")}
                    <br /> {equipName(
                      `baseSetting.skills.${equip.skill}.name`
                    )}{" "}
                    Lv
                    {equip.lv}
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
