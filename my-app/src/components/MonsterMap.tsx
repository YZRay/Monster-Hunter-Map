import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Fragment, FC } from "react";
import "leaflet/dist/leaflet.css";
interface Props {
  data: GetResponse | null;
  monster: string[];
  geolocation: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}
const MonsterMap: FC<Props> = ({ geolocation, data, monster }) => {
  return (
    <MapContainer
      center={{
        lat: geolocation?.latitude || 25.033671,
        lng: geolocation?.longitude || 121.564427,
      }}
      zoom={17}
      minZoom={15}
      maxZoom={18}
      scrollWheelZoom={false}
      className="w-full h-[30rem] max-h-[30rem] z-0 mb-12"
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
      />
    </MapContainer>
  );
};

export default MonsterMap;
