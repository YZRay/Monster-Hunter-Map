import { FC, Fragment, useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

interface MapTableProps {
  data: GetResponse | null;
  monster: string[];
  city: string;
}

const MapTable: FC<MapTableProps> = ({ data, monster, city }) => {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(coordinates: string) {
    try {
      // 使用 Clipboard API 写入剪贴板
      await navigator.clipboard.writeText(coordinates);
      console.log("已成功复制到剪贴板！");
      setIsCopied(true);
    } catch (err) {
      console.error("复制文本失败：", err);
    }
  }
  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500); //顯示1.5秒
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const filteredData = data
    ? data.data.filter((item) => {
        return (
          (monster.length === 0 || monster.includes(item.name)) &&
          (city === "全部" || item.location === city)
        );
      })
    : [];

  const locationTable = filteredData.map((item) => (
    <tr key={item.id}>
      <td className="px-12 py-6 border border-slate-200">
        <div className="flex gap-1">
          {Array.from(
            { length: item.level > 5 ? item.level - 5 : item.level },
            (_, index) => (
              <StarIcon
                key={index}
                className={`w-5 h-5 ${
                  item.level > 5 ? "text-purple-600" : "text-yellow-300"
                }`}
              />
            )
          )}
        </div>
        <div className="text-base lg:text-lg">
          {item.name} 在 {item.location}
        </div>
      </td>
      <td
        className="px-12 py-6 border border-slate-200 text-base lg:text-lg cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
        onClick={() =>
          copyTextToClipboard(
            `${item.level}星 ${item.name} 在 ${item.location} 經緯度：${item.coordinates}`
          )
        }
      >
        <div className="flex gap-1 items-center cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
          <ClipboardDocumentIcon title="複製" className="w-10 h-10" />
          <span className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
            {item.coordinates}
          </span>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-7xl mx-auto mt-2 mb-4  md:mb-8 md:mt-4 lg:mb-16 rounded-lg">
      <h1 className="text-xl lg:text-2xl font-bold mb-2 text-gray-800">
        魔物目擊地圖資訊
      </h1>
      <div className="relative overflow-y-scroll max-h-[30rem] shadow-md">
        <table className="table-auto lg:table-fixed text-base text-left w-max md:w-full font-bol text-slate-200 opacity-90 bg-slate-700 border-spacing-2 border border-slate-200 rounded-lg">
          <thead className="sticky top-0 bg-slate-700 border-b-2 text-base md:text-lg">
            <tr>
              <th className="px-12 py-6 border border-slate-200">魔物資料</th>
              <th className="px-12 py-6 border border-slate-200">經緯度</th>
            </tr>
          </thead>
          <tbody>{locationTable}</tbody>
        </table>
      </div>{" "}
      {isCopied && (
        <div className="text-green-500 text-center mt-2 text-base">
          複製成功！
        </div>
      )}
    </div>
  );
};

export default MapTable;
