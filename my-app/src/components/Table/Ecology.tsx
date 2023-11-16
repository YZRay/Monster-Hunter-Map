import React, { FC } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterEcology: FC<MyComponentProps<any>> = (props) => {
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
          <th>出現區域</th>
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
