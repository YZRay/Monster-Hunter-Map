import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { LatLngTuple, Icon } from "leaflet";
import { FC, useState, useLayoutEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { HiFaceSmile, HiFaceFrown } from "react-icons/hi2";
import { toast } from "react-toastify";
import useUserId from "./Hook/UserId";
import {
  createBadLocation,
  createGoodLocation,
  queryClient,
} from "./api/MLApi";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import CountdownTimer from "./CountdownTimer";

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
  const [iconSize, setIconSize] = useState(35);
  const { t } = useTranslation("monster");
  const { t: transName } = useTranslation("data");

  const processedData =
    data?.data.map((item) => ({
      ...item,
      monsterNames: item.name.split(",").slice(0, 1).join(""),
    })) || [];

  //魔物圖示
  const monsterIcon = (name: string) =>
    new Icon({
      iconUrl: `/assets/icons/Monster/${name}.svg`,
      iconSize: [iconSize, iconSize], // 設定圖案大小
      iconAnchor: [iconSize / 2, iconSize / 2], // 設定錨點位置
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
        iconSize: [iconSize, iconSize], // 設定圖案大小
        iconAnchor: [iconSize / 2, iconSize / 2], // 設定錨點位置
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

  const { mutate: createGood } = useMutation({
    mutationFn: createGoodLocation,
  });

  const { mutate: createBad } = useMutation({
    mutationFn: createBadLocation,
  });

  const sendReport = (
    isGood: boolean,
    uid: string | null,
    mlitem: DataItem
  ) => {
    if (isCreateing || !uid) {
      return;
    }

    var loading = toast.loading(`${t("MonsterMap.reporting")}`);

    setIsCreateing(true);

    var model = {
      uid: uid,
      mlid: mlitem.id,
    };

    const successCallback = (data: any) => {
      toast.dismiss(loading);
      data.json().then((data: any) => {
        if (!data.status) {
          toast.error(`${t("MonsterMap.error")}`, {
            position: "top-center",
            className: "danger",
            autoClose: 1500,
          });
        } else {
          toast.success(`${t("MonsterMap.success")}`, {
            position: "top-center",
            autoClose: 1500,
          });
        }
        setIsCreateing(false);
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["monsterList"] });
        }, 4500);
      });
    };

    const errorCallback = () => {
      toast.error(`${t("MonsterMap.failed")}`, {
        position: "top-center",
        autoClose: 1500,
      });
      setIsCreateing(false);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["monsterList"] });
      }, 4500);
    };

    if (isGood) {
      createGood(model, {
        onSuccess: successCallback,
        onError: errorCallback,
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["monsterList"] });
        },
      });
    } else {
      createBad(model, {
        onSuccess: successCallback,
        onError: errorCallback,
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["monsterList"] });
        },
      });
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
      toast.success(`${t("MonsterMap.copy")}`, {
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
      console.error(`${t("MonsterMap.copyFailed")}`, err);
    }
  }

  //Popup顯示資訊，點擊卡片的就顯示卡片資訊
  const getPopupContent = (dataItem: DataItem | null) => {
    if (dataItem) {
      const names = dataItem.name.split(",");
      return (
        <>
          <div className="flex gap-4 items-center mb-2">
            <div className="flex gap-2 flex-wrap items-center">
              {names.map((name, index) => (
                <span
                  key={index}
                  className="text-base font-semibold text-slate-700"
                >
                  {transName(`equipSetting.${name}.name`)}
                </span>
              ))}
            </div>
            <div className="flex gap-1 items-center">
              <HiFaceSmile
                title="回報正確定位"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  sendReport(true, userId.userId || "", dataItem);
                }}
              />
              <span className="text-lg">{dataItem.goodLocations.length}</span>
            </div>
            <div className="flex gap-1 items-center">
              <HiFaceFrown
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
                <FaStar
                  key={index}
                  className={`w-5 h-5 drop-shadow-md ${
                    dataItem.level > 5 ? "text-purple-600" : "text-amber-400"
                  }`}
                />
              )
            )}
          </div>
          <span
            className={`${dataItem.isHuntAThons ? "mb-2" : ""} inline-block`}
          >
            {(() => {
              const date = new Date(dataItem.createdAt + "Z");
              const localTime = date.toLocaleString(undefined, {
                hour12: false,
              });
              return localTime;
            })()}
          </span>
          {dataItem.isHuntAThons && (
            <CountdownTimer
              endTime={dataItem.remainingTime}
              createdTime={dataItem.createdAt}
              id={dataItem.id}
            />
          )}
        </>
      );
    } else {
      return `${t("MonsterMap.current")}`;
    }
  };

  function MyMapComponent() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        switch (mapEvents.getZoom()) {
          case 12:
            setIconSize(30);
            break;
          case 11:
            setIconSize(25);
            break;
          case 10:
            setIconSize(20);
            break;
          case 9:
            setIconSize(15);
            break;
          case 8:
            setIconSize(10);
            break;
          default:
            setIconSize(35);
            break;
        }
      },
    });

    return null;
  }

  return (
    <div>
      <MapContainer
        key={geolocation?.latitude || 0}
        center={position}
        zoom={17}
        minZoom={8}
        maxZoom={18}
        scrollWheelZoom={false}
        className="w-full h-[30rem] max-h-[30rem] z-0 mb-8"
      >
        <MyMapComponent />
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
