// GeoLocationBtn.tsx
import React, { useState } from "react";
import { MapPinIcon } from "@heroicons/react/20/solid";

function GeoLocationBtn({
  onGeolocationData,
}: {
  onGeolocationData: (data: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    if (isLoading) {
      return; // 如果正在載入，則不再執行
    }

    setIsLoading(true); // 開始載入

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeolocationData({ latitude, longitude });
        },
        (error) => {
          console.error("發生錯誤", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("瀏覽器不支援地理位置功能");
    }
  };

  return (
    <button
      onClick={getLocation}
      disabled={isLoading}
      className={`w-full md:w-1/2 flex items-center justify-center rounded-md py-2 font-bold transition-all ease-linear ${
        isLoading
          ? "bg-gray-300 text-gray-500 cursor-[url('/assets/icons/mh_cursor.svg'),_auto]" // 禁止上傳
          : "bg-slate-400 text-white hover:bg-slate-800 duration-300 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
      }`}
    >
      <MapPinIcon className="w-6 h-6" />
      <span>{isLoading ? "已取得" : "取得位置"}</span>
    </button>
  );
}

export default GeoLocationBtn;
