import { Transition, Dialog, Tab } from "@headlessui/react";
import { Fragment, useState, useEffect, useCallback } from "react";
import FieldIcon from "../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../public/assets/icons/monster_icon.svg";
import { fetchMonsterLocation } from "./api/Location";
import { GetlocationList } from "./api/Getlocationlist";
import { Getlocation } from "./api/Getlocation";
import { getGeolocationData } from "./api/GeolocationAPI";
import Image from "next/image";
import monster from "../data/data.json";
import dynamic from "next/dynamic";
import MonsterMap from "@/components/MonsterMap";
import SearchMonster from "./SearchMonster";

const MapTable = dynamic(() => import("./Table/MapTable"));
const MonsterForm = dynamic(() => import("./form/MonsterForm"));

const monsterNames = Object.values(monster.equipSetting)
  .filter(
    (armor) =>
      !armor.name.includes("皮製") &&
      !armor.name.includes("礦石") &&
      armor.mapShow
  )
  .map((armor) => armor.name);

const MapSelection = () => {
  //摺疊搜尋區塊
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  }, []);
  //打開表單
  let [isOpenForm, setIsOpenForm] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpenForm(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpenForm(true);
  }, []);

  const [city, setCity] = useState("");
  const [LocationList, setLocationList] = useState<string[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [data, setData] = useState<GetResponse | null>(null);
  const [geolocation, setGeolocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      // 載入經緯度數據
      getGeolocationData((geoData) => {
        setGeolocation(geoData);
      });

      // 取得已經上傳的地區、國家
      const locationListResult = await GetlocationList();
      if (locationListResult) {
        setLocationList(locationListResult.data);
      }

      // 獲取上傳的魔物資料
      const monsterDataResult = await fetchMonsterLocation();
      if (monsterDataResult) {
        setData(monsterDataResult);
      }
    }

    fetchData();
  }, []);
  // 獲取經緯度城市
  useEffect(() => {
    async function fetchData() {
      if (geolocation) {
        const cityLocation = `${geolocation.latitude}%2C${geolocation.longitude}`;
        const result = await Getlocation(cityLocation);
        if (result) {
          setCity(result.data);
          setSelectedRegion(result.data);
        }
      }
    }
    fetchData();
  }, [geolocation]);

  return (
    <Fragment>
      {/* 搜尋魔物 */}
      <SearchMonster
        monsterNames={monsterNames}
        selectedMonster={selectedMonster}
        handleMonsterSelection={(value) => {
          setSelectedMonster((prev) => {
            if (prev.includes(value)) {
              return prev.filter((item) => item !== value);
            } else {
              return [...prev, value];
            }
          });
        }}
        city={city}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        LocationList={LocationList}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      {/* 搜尋魔物 */}
      {/* 上傳魔物表單 */}
      <button
        type="button"
        onClick={openModal}
        className="w-full btn justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]  font-bold my-4 md:my-8 text-base shadow-color"
      >
        上傳魔物資訊
      </button>
      {/* 上傳魔物表單 */}
      {/* 切換動態地圖 */}
      <Tab.Group>
        <Tab.List className="flex items-center gap-4 mb-4 mt-1">
          <Tab className="monster-tab flex items-center md:gap-2 text-lg py-2">
            <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
            目擊資訊
          </Tab>
          <Tab className="monster-tab flex items-center md:gap-2 text-lg py-2">
            <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
            動態地圖
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {/* 魔物上傳資訊 */}
            <MapTable
              data={data}
              monster={selectedMonster}
              city={selectedRegion}
            />
          </Tab.Panel>
          <Tab.Panel>
            {/* 動態地圖 */}
            <MonsterMap geolocation={geolocation} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* 切換動態地圖 */}
      <Transition appear show={isOpenForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <Dialog.Panel className="w-full max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-800"
                  >
                    分享魔物資訊
                  </Dialog.Title>
                  <MonsterForm />
                  <button
                    type="button"
                    className="w-full justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer] bg-slate-400 py-2 text-white font-bold hover:bg-slate-800 duration-300"
                    onClick={closeModal}
                  >
                    取消
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default MapSelection;
