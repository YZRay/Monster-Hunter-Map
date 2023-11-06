import { FC, Fragment, useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

interface MapTableProps {
  data: GetResponse | null;
  monster: string[];
  city: string;
}

const MapTable: FC<MapTableProps> = ({ data, monster, city }) => {
  async function copyTextToClipboard(coordinates: string) {
    try {
      // 使用 Clipboard API 写入剪贴板
      await navigator.clipboard.writeText(coordinates);
      console.log("已成功复制到剪贴板！");
      toast.success("已複製位置", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("复制文本失败：", err);
    }
  }

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
      onClick={() => copyTextToClipboard(`${item.coordinates}`)}
    >
      <div className="justify-around flex-wrap">
        <div className="flex gap-2 relative items-center">
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
              <p>{item.name}</p>
              <p>
                {(() => {
                  const date = new Date(item.createdAt + "Z");
                  const localTime = date.toLocaleString(undefined, {
                    hour12: false,
                  });
                  return localTime;
                })()}
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0">
            <ClipboardDocumentIcon
              title="複製"
              className="w-8 h-8 cursor-[url('/assets/icons/mh_hand.svg'),_pointer] float-right"
            />
          </div>
        </div>
        <div className="flex gap-1 items-center pt-2">
          <MapPinIcon className="w-5 h-8" />
          <span>
            {item.location} - {item.coordinates}
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="mt-2 mb-4 md:mb-8 md:mt-4 lg:mb-16">
      <ToastContainer />
      <h1 className="text-xl lg:text-2xl font-bold mb-2 text-gray-800">
        魔物目擊地圖資訊
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-2 md:gap-y-4">
        {locationTable}
      </div>{" "}
    </div>
  );
};

export default MapTable;
