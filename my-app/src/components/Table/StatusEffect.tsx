import React, { FC, useState, Fragment } from "react";
import Image from "next/image";

interface MyComponentProps<T> {
  data: T;
}
const MonsterStatusEffect: FC<MyComponentProps<any>> = () => {
  return (
    <Fragment>
      <p className="text-center text-md font-bold text-gray-800">
        的數量越多，對魔物越有效
      </p>
      <table className="monster-table">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th>狀態異常</th>
            <th>有效程度</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800">
            <td>
              <Image
                src="/assets/icons/Elements/blastblight.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="fire"
                className="mx-auto"
              />
            </td>
            <td>10</td>
          </tr>
          <tr className="bg-gray-800">
            <td>
              <Image
                src="/assets/icons/Elements/paralysis.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="fire"
                className="mx-auto"
              />
            </td>
            <td>20</td>
          </tr>
          <tr className="bg-gray-800">
            <td>
              <Image
                src="/assets/icons/Elements/stun.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="fire"
                className="mx-auto"
              />
            </td>
            <td>20</td>
          </tr>
          <tr className="bg-gray-800">
            <td>
              <Image
                src="/assets/icons/Elements/sleep.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="fire"
                className="mx-auto"
              />
            </td>
            <td>20</td>
          </tr>
          <tr className="bg-gray-800">
            <td>
              <Image
                src="/assets/icons/Elements/poison.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="fire"
                className="mx-auto"
              />
            </td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default MonsterStatusEffect;
