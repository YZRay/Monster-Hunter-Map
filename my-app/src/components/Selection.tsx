"use client";
import { FC, Fragment, useState } from "react";
import data from "../data/data.json";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const MonsterModal = dynamic(() => import("./Modal/MonsterModal.tsx"), {
  ssr: false,
});
const Selection: FC<SelectionProps> = ({
  onArmorClick,
  onMonsterClick,
  selectedMonster,
}) => {
  const { t } = useTranslation("monster");
  const { t: transData } = useTranslation("data");
  const { t: transSkills } = useTranslation("data");
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
          className="h-8 w-8 md:w-12 md:h-12"
          src={`/assets/icons/${item}.svg`}
          width={50}
          height={50}
          alt="equipment"
          loading="lazy"
        />
      </th>
    );
  });

  const renderEquipmentType = (
    armor: Armor,
    type: string,
    armorKey: string
  ) => {
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
          onArmorClick(armor, type, armorKey);
        }}
      >
        {equipArray.map((equipment, index) => (
          <div className="p-2" key={index}>
            {equipment.skill && (
              <p className="text-sm md:text-base">
                G{equipment.unlock}{" "}
                {transSkills(`baseSetting.skills.${equipment.skill}.name`)} lv:
                {equipment.lv}
              </p>
            )}
          </div>
        ))}
      </td>
    );
  };

  //表格內容
  const armorRows = Object.entries(data.equipSetting).map(
    ([armorKey, armor]: [string, Armor]) => (
      <tr className="z-0" key={armor.id}>
        <th
          scope="row"
          onClick={() => {
            onMonsterClick({ ...armor, key: armorKey });
            if (armorKey === "alloy" || armorKey === "leather") {
              return setIsModalOpen(false);
            }
            setIsModalOpen(true);
          }}
          className="sticky left-0 border-r-2 bg-slate-700 px-2 py-2 font-bold text-center hover:bg-slate-800 border border-slate-200 "
        >
          <div className="flex items-center flex-col">
            <Image
              className=""
              src={`/assets/icons/Monster/${armorKey}.svg`}
              width={60}
              height={60}
              alt="equipment"
              loading="lazy"
            />
            {transData(`equipSetting.${armorKey}.name`)}
          </div>
        </th>
        <td className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200 text-center">
          {armor.unlock}
        </td>
        {renderEquipmentType(armor, "weapon", armorKey)}
        {renderEquipmentType(armor, "helm", armorKey)}
        {renderEquipmentType(armor, "mail", armorKey)}
        {renderEquipmentType(armor, "gloves", armorKey)}
        {renderEquipmentType(armor, "belt", armorKey)}
        {renderEquipmentType(armor, "greaves", armorKey)}
      </tr>
    )
  );

  return (
    <Fragment>
      <MonsterModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monsterData={selectedMonster}
      ></MonsterModal>
      <div className="container mt-4 mb-6 lg:mt-8 lg:mb-16 rounded-lg">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-slate-300">
          {t("Selection.information")}
        </h1>
        <div className="relative overflow-auto  max-h-[40rem] w-full shadow-md">
          <table className="table-auto text-base text-left font-bold w-max lg:w-full text-slate-200 opacity-90 bg-slate-700 border-spacing-2 border border-slate-200 rounded-lg">
            <thead className="text-center sticky top-0 z-10 bg-slate-700 border-b-2">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200"
                >
                  {t("Selection.type")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-1 lg:px-6 lg:py-3 border border-slate-200"
                >
                  {t("Selection.level")}
                </th>
                {th}
              </tr>
            </thead>
            <tbody className="cursor-pointer">{armorRows}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default Selection;
