import React, { useState } from "react";
import { getGeolocationData } from "./GeolocationAPI"; // 引入地理位置函數
import { useTranslation } from "react-i18next";
import { FaLocationDot } from "react-icons/fa6";

function GeoLocationBtn({
  onGeolocationData,
}: {
  onGeolocationData: (data: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("monster");
  const getLocation = () => {
    if (isLoading) {
      return; // 如果正在載入，則不再執行
    }

    setIsLoading(true); // 開始載入

    getGeolocationData((geolocationData) => {
      onGeolocationData(geolocationData);
      setIsLoading(true); // 資料獲取完成後停止載入
    });
  };

  return (
    <button
      onClick={getLocation}
      disabled={isLoading}
      className={`w-full md:w-1/2 flex items-center justify-center gap-1 rounded-md py-2 font-bold transition-all ease-linear ${
        isLoading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" // 禁止上傳
          : "bg-slate-400 text-white hover:bg-slate-800 duration-300 cursor-pointer"
      }`}
    >
      <FaLocationDot className="w-5 h-5" />
      <span>
        {isLoading
          ? `${t("MonsterMap.gotCurrent")}`
          : `${t("MonsterMap.getCurrent")}`}
      </span>
    </button>
  );
}

export default GeoLocationBtn;
