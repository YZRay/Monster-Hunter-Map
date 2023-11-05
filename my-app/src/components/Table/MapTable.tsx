import { FC, Fragment, useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

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
    <div
      className="flex flex-col text-base lg:text-lg font-bold bg-slate-400 text-slate-200 rounded-md shadow-md p-4 hover:bg-slate-800 duration-300 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
      key={item.id}
      onClick={() =>
        copyTextToClipboard(
          `${item.coordinates}`
        )
      }
    >
      <div className="flex items-center justify-around flex-wrap">
        <div className="flex gap-2">
          {item.name.split(",").map((monsterName, index) => {
            return (
              <div key={index}>
                <Image
                  className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer] h-16 w-16 drop-shadow"
                  src={`/assets/icons/Monster/${monsterName}.svg`}
                  width={50}
                  height={50}
                  alt="equipment"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        <div>
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
          <div>
            {item.name} 在 {item.location}
          </div>
          <div className="flex gap-1 items-center">
            <ClipboardDocumentIcon
              title="複製"
              className="w-8 h-8 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
            />
            <span>{item.coordinates}</span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="mt-2 mb-4 md:mb-8 md:mt-4 lg:mb-16">
      <h1 className="text-xl lg:text-2xl font-bold mb-2 text-gray-800">
        魔物目擊地圖資訊
      </h1>
      {isCopied && (
        <div className="text-green-800 text-center mt-2 text-base">
          複製成功！
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-2 md:gap-y-4">
        {locationTable}
      </div>{" "}
    </div>
  );
};

export default MapTable;
