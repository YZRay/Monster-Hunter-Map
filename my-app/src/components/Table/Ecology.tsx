import React, { FC } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface MyComponentProps<T> {
  data: T;
}
const MonsterEcology: FC<MyComponentProps<any>> = (props) => {
  const { t } = useTranslation("monster");
  const location = props.data.location.map((item: string[], index: number) => {
    return (
      <Image
        key={index}
        src={`/assets/icons/${item}.svg`}
        width={30}
        height={30}
        alt="equipment"
        loading="lazy"
      />
    );
  });

  return (
    <table className="monster-table">
      <thead className="bg-gray-800 text-gray-300">
        <tr>
          <th>{t("MonsterMap.generation")}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-800">
          <td className="flex justify-evenly">{location}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonsterEcology;
