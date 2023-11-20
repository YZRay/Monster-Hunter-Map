import React, { FC, useState } from "react";
import Image from "next/image";

interface PostTableProps {
    data: GetResponse | null;
  }

const postTable: FC<PostTableProps> = ({data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="monster-table w-max md:w-full">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th>&emsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-800">
            <td>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default postTable;
