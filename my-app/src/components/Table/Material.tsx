import React, { FC, useState } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterMaterial: FC<MyComponentProps<any>> = () => {
  return (
    <table className="monster-table">
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
          <td>鱗</td>
          <td>2%</td>
          <td>40%</td>
          <td>20%</td>
        </tr>
        <tr className="bg-gray-800">
          <td>甲殻</td>
          <td>42%</td>
          <td>69%</td>
          <td>28%</td>
        </tr>
        <tr className="bg-gray-800">
          <td>翼膜</td>
          <td>29%</td>
          <td>15%</td>
          <td>15%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonsterMaterial;
