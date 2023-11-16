import React, { FC, useState } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterMaterial: FC<MyComponentProps<any>> = () => {
  return (
    <div className="overflow-x-auto">
      <table className="monster-table w-max md:w-full">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th>素材</th>
            <th>捕獲報酬</th>
            <th>部位破壞</th>
            <th>剝取機率</th>
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

export default MonsterMaterial;
