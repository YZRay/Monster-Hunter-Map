import { FC, Fragment, useState } from "react";
interface MapTableProps {
  data: GetResponse | null;
}
const MapTable: FC<MapTableProps> = ({ data }) => {
  const locationTable = data
    ? data.data.map((item) => (
        <tr key={item.id}>
          <td className="px-6 py-3 border border-slate-200">{item.level}</td>
          <td className="px-6 py-3 border border-slate-200">{item.name}</td>
          <td className="px-6 py-3 border border-slate-200">
            {item.coordinates}
          </td>
          <td className="px-6 py-3 border border-slate-200">{item.location}</td>
          <td className="px-6 py-3 border border-slate-200">{item.desc}</td>
        </tr>
      ))
    : null;

  return (
    <div className="max-w-7xl mx-auto mt-8 mb-16 rounded-lg">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">魔物資訊</h1>
      <div className="relative overflow-y-scroll max-h-[30rem] shadow-md">
        <table className="table-auto text-base text-left w-full font-bol text-slate-200 opacity-90 bg-slate-700 border-spacing-2 border border-slate-200 rounded-lg">
          <thead className="sticky top-0 bg-slate-700 border-b-2">
            <tr>
              <th className="px-6 py-3 border border-slate-200">Level</th>
              <th className="px-6 py-3 border border-slate-200">魔物</th>
              <th className="px-6 py-3 border border-slate-200">縣市</th>
              <th className="px-6 py-3 border border-slate-200">地點</th>
              <th className="px-6 py-3 border border-slate-200">簡述地點</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-3 border border-slate-200">5星</td>
              <td className="px-6 py-3 border border-slate-200">火龍</td>
              <td className="px-6 py-3 border border-slate-200">高雄</td>
              <td className="px-6 py-3 border border-slate-200">前鎮區.....</td>
              <td className="px-6 py-3 border border-slate-200">
                在XX捷運站旁邊
              </td>
            </tr>
            {locationTable}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapTable;
