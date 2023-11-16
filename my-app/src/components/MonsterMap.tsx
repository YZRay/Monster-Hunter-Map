import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { LatLngTuple, Icon } from "leaflet";
import { FC } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";

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

  return (
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
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MonsterMap;
