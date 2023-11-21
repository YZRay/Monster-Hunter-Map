import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { LatLngTuple, Icon } from "leaflet";
import { FC, useState } from "react";
import { StarIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import useUserId from "./ID/UserId";
import { createBadLocation } from "./api/MLApi";

interface Props {
  data: GetResponse | null;
  monster: string[];
  geolocation: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

const MonsterMap: FC<Props> = ({ geolocation, data, monster }) => {
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
      iconAnchor: [15, 15], // 設定錨點位置
    });

  //當前位置的icon
  const curlocationIcon = () =>
    new Icon({
      iconUrl: `/assets/icons/location.svg`,
      iconSize: [40, 40], // 設定圖案大小
      iconAnchor: [20, 20], // 設定錨點位置
    });

  const userId = useUserId();

  const [isCreateing, setIsCreateing] = useState(false);

  const sendBad = (uid: string | null, mlitem: DataItem) => {
    if (isCreateing || !uid) {
      return;
    }

    var loading = toast.loading("回報中！");

    setIsCreateing(true);

    var model = {
      uid: uid,
      mlid: mlitem.id
    };

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
      .finally(() => {
      });
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

  async function openGoogleMap(coordinates: string) {
    const confirmed = window.confirm("是否打開 Google 地圖查看位置？");

    if (confirmed) {
      const googleMapUrl = `https://www.google.com/maps?q=${coordinates}`;
      window.open(googleMapUrl, "_blank");
    }
  }

  return (
    <div>
      <ToastContainer />
      <MapContainer
        center={position}
        zoom={17}
        minZoom={12}
        maxZoom={18}
        scrollWheelZoom={false}
        className="w-full h-[30rem] max-h-[30rem] z-0 mb-12"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 當前位置 */}
        <Marker position={position} icon={curlocationIcon()}>
          <Popup>當前位置</Popup>
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
                //openGoogleMap(monsterData.coordinates);
              },
            }}
          >
            <Popup>
              {monsterData.name}
              <div className="flex gap-1">
                {Array.from(
                  {
                    length:
                      monsterData.level > 5
                        ? monsterData.level - 5
                        : monsterData.level,
                  },
                  (_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-5 h-5 drop-shadow-md ${
                        monsterData.level > 5
                          ? "text-purple-600"
                          : "text-amber-400"
                      }`}
                    />
                  )
                )}
              </div>
              <div className="flex gap-1">
                <span className="text-lg">{monsterData.badLocations.length}</span>
                <FaceFrownIcon
                  title="回報錯誤定位"
                  className="w-6 h-6 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]"
                  onClick={() => {
                    sendBad(userId.userId || "", monsterData);
                  }}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MonsterMap;
