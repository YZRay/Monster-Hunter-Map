import React, { FC, useState } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterTableData: FC<MyComponentProps<any>> = () => {
  return (
    <div className="relative overflow-x-auto">
      <table className="monster-table w-max md:w-full">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th>&emsp;</th>
            <th>斬擊</th>
            <th>打擊</th>
            <th>彈藥</th>
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
