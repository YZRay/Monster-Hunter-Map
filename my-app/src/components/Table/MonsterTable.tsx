import React, { FC, useState } from "react";

import { useTranslation } from "react-i18next";

interface MyComponentProps<T> {
  data: T;
}
const MonsterTableData: FC<MyComponentProps<any>> = () => {
  const { t } = useTranslation("monster");
  return (
    <div className="relative overflow-x-auto">
      <table className="monster-table w-max md:w-full">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th>&emsp;</th>
            <th>{t("MonsterMap.cutting")}</th>
            <th>{t("MonsterMap.impact")}</th>
            <th>{t("MonsterMap.shot")}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonsterTableData;
