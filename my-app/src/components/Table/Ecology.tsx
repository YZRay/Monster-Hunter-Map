import React, { FC, useState } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterEcology: FC<MyComponentProps<any>> = () => {
  return (
    <table className="monster-table">
      <thead className="bg-gray-800 text-gray-300">
        <tr>
          <th>出現區域</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-800">
          <td className="flex justify-evenly">
            <span>森林</span>
            <span>沙漠</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonsterEcology;
