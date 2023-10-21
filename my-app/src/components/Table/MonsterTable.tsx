import React, { FC, useState } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterTableData: FC<MyComponentProps<any>> = () => {
  return (
    <table className="monster-table">
      <thead className="bg-gray-800 text-gray-300">
        <tr>
          <th>&emsp;</th>
          <th>斬擊</th>
          <th>打擊</th>
          <th>彈藥</th>
          <th>
            <Image
              src="/assets/icons/Elements/fire.svg"
              width={40}
              height={40}
              loading="lazy"
              alt="fire"
              className="mx-auto"
            />
          </th>
          <th>
            <Image
              src="/assets/icons/Elements/water.svg"
              width={40}
              height={40}
              loading="lazy"
              alt="fire"
              className="mx-auto"
            />
          </th>
          <th>
            <Image
              src="/assets/icons/Elements/thunder.svg"
              width={40}
              height={40}
              loading="lazy"
              alt="fire"
              className="mx-auto"
            />
          </th>
          <th>
            <Image
              src="/assets/icons/Elements/ice.svg"
              width={40}
              height={40}
              loading="lazy"
              alt="fire"
              className="mx-auto"
            />
          </th>
          <th>
            <Image
              src="/assets/icons/Elements/dragon.svg"
              width={40}
              height={40}
              loading="lazy"
              alt="fire"
              className="mx-auto"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-800">
          <td>頭部</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
        </tr>
        <tr className="bg-gray-800">
          <td>腹部</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonsterTableData;
