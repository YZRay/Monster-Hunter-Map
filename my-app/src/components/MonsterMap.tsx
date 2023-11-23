import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { LatLngTuple, Icon } from "leaflet";
import { FC, useState, useLayoutEffect } from "react";
import { StarIcon, FaceSmileIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import useUserId from "./Hook/UserId";
import { createBadLocation, createGoodLocation } from "./api/MLApi";

interface Props {
  data: GetResponse | null;
  monster: string | string[];
  geolocation: {
    latitude: number | null;
    longitude: number | null;
  } | null;
  monsterData: DataItem | null;
}

const MonsterMap: FC<Props> = ({ geolocation, data, monster, monsterData }) => {
  const latitude = geolocation?.latitude || 25.033671;
  const longitude = geolocation?.longitude || 121.564427;
  const position: LatLngTuple = [latitude, longitude];

  const processedData =
    data?.data.map((item) => ({
      ...item,
      monsterNames: item.name.split(",").slice(0, 1).join(""),
    })) || [];

  //魔物圖示
  const monsterIcon = (name: string) =>
    new Icon({
      iconUrl: `/assets/icons/Monster/${name}.svg`,
      iconSize: [45, 45], // 設定圖案大小
      iconAnchor: [45 / 2, 45 / 2], // 設定錨點位置
    });

  //當前位置的icon
  const curlocationIcon = () => {
    // 如果有monsterData就用monsterData的icon
    if (monsterData && monsterData.name) {
      return new Icon({
        iconUrl: `/assets/icons/Monster/${monsterData.name
          .split(",")
          .slice(0, 1)
          .join("")}.svg`,
        iconSize: [45, 45], // 設定圖案大小
        iconAnchor: [45 / 2, 45 / 2], // 設定錨點位置
      });
    } else {
      return new Icon({
        iconUrl: `/assets/icons/location.svg`,
        iconSize: [40, 40], // 設定圖案大小
        iconAnchor: [20, 20], // 設定錨點位置
      });
    }
  };

  const userId = useUserId();

  const [isCreateing, setIsCreateing] = useState(false);

  const sendReport = (isGood: boolean, uid: string | null, mlitem: DataItem) => {
    if (isCreateing || !uid) {
      return;
    }

    var loading = toast.loading("回報中！");

    setIsCreateing(true);

    var model = {
      uid: uid,
      mlid: mlitem.id,
    };

    if(isGood){
      createGoodLocation(model)
      .then((response) => {
        if (!response.ok) {
          toast.error("網路回應發生錯誤", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.dismiss(loading);
        if (!data.status) {
          toast.error("回報失敗！", {
            position: "top-center",
            className: "danger",
            autoClose: 1500, // 1.5秒關閉
          });
        } else {
          toast.success("回報成功！", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });

          mlitem.goodLocations.push(model);
        }

        setIsCreateing(false);
      })
      .catch((error) => {
        console.error("Error submit Form", error);
      })
      .finally(() => {});
    }else{
      createBadLocation(model)
      .then((response) => {
        if (!response.ok) {
          toast.error("網路回應發生錯誤", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.dismiss(loading);
        if (!data.status) {
          toast.error("回報失敗！", {
            position: "top-center",
            className: "danger",
            autoClose: 1500, // 1.5秒關閉
          });
        } else {
          toast.success("回報成功！", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });

          mlitem.badLocations.push(model);
        }

        setIsCreateing(false);
      })
      .catch((error) => {
        console.error("Error submit Form", error);
      })
      .finally(() => {});
    }
  };

  // 顯示地圖初始化
  const [mapInitiated, setMapInitiated] = useState(false);
  useLayoutEffect(() => {
    setMapInitiated(true);
  }, []); // 空的依賴陣列確保只在組件初次渲染時執行
  if (!mapInitiated) {
    return null;
  }

  async function copyTextToClipboard(coordinates: string) {
    try {
      // 使用 Clipboard API 写入剪贴板
      await navigator.clipboard.writeText(coordinates);
      console.log("已成功複製");
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
      console.error("複製失敗：", err);
    }
  }

  //Popup顯示資訊，點擊卡片的就顯示卡片資訊
  const getPopupContent = (dataItem: DataItem | null) => {
    if (dataItem) {
      return (
        <>
          <div className="flex gap-4 items-center mb-2">
            <span className="text-base font-semibold text-slate-700">
              {dataItem.name}
            </span>
            <div className="flex gap-1 items-center">
              <FaceSmileIcon
                title="回報正確定位"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  sendReport(true, userId.userId || "", dataItem);
                }}
              />
              <span className="text-lg">{dataItem.goodLocations.length}</span>
            </div>
            <div className="flex gap-1 items-center">
              <FaceFrownIcon
                title="回報錯誤定位"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  sendReport(false, userId.userId || "", dataItem);
                }}
              />
              <span className="text-lg">{dataItem.badLocations.length}</span>
            </div>
          </div>
          <div className="flex gap-1 mb-2">
            {Array.from(
              {
                length:
                  dataItem.level > 5 ? dataItem.level - 5 : dataItem.level,
              },
              (_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 drop-shadow-md ${
                    dataItem.level > 5 ? "text-purple-600" : "text-amber-400"
                  }`}
                />
              )
            )}
          </div>
          <span>
            {(() => {
              const date = new Date(dataItem.createdAt + "Z");
              const localTime = date.toLocaleString(undefined, {
                hour12: false,
              });
              return localTime;
            })()}
          </span>
        </>
      );
    } else {
      return "當前位置";
    }
  };

  return (
    <div>
      <MapContainer
        key={geolocation?.latitude || 0}
        center={position}
        zoom={17}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom={false}
        className="w-full h-[30rem] max-h-[30rem] z-0 mb-8"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 當前位置 */}
        <Marker
          position={position}
          icon={curlocationIcon()}
          eventHandlers={{
            add: (e) => {
              e.target.openPopup();
            },
          }}
        >
          <Popup>{getPopupContent(monsterData)}</Popup>
        </Marker>
        {/* 魔物位置 */}
        {processedData.map((monsterData) => (
          <Marker
            key={monsterData.id}
            position={[monsterData.lat, monsterData.lng]}
            icon={monsterIcon(monsterData.monsterNames)}
            eventHandlers={{
              click: () => {
                copyTextToClipboard(monsterData.coordinates);
              },
            }}
          >
            <Popup>{getPopupContent(monsterData)}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MonsterMap;
