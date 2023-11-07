import { Listbox, Transition, Dialog } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ChevronUpDownIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { fetchMonsterLocation } from "./api/Location";
import { GetlocationList } from "./api/Getlocationlist";
import { Getlocation } from "./api/Getlocation";
import { getGeolocationData } from "./api/GeolocationAPI";
import Image from "next/image";
import MapTable from "./Table/MapTable";
import MonsterForm from "./form/MonsterForm";
import monster from "../data/data.json";
import { log } from "console";

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
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  //打開表單
  let [isOpenForm, setIsOpenForm] = useState(false);
  function closeModal() {
    setIsOpenForm(false);
  }
  function openModal() {
    setIsOpenForm(true);
  }
  const [city, setCity] = useState("");
  const [LocationList, setLocationList] = useState<string[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [data, setData] = useState<GetResponse | null>(null);
  const [geolocation, setGeolocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  } | null>(null);

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
  // 載入經緯度數據
  useEffect(() => {
    async function loadGeolocation() {
      getGeolocationData((data) => {
        setGeolocation(data);
      });
    }
    loadGeolocation();
  }, []);

  //取的已經上傳的地區、國家
  useEffect(() => {
    async function fetchData() {
      const result = await GetlocationList();
      if (result) {
        setLocationList(result.data);
      }
    }
    fetchData();
  }, []);

  // 獲取上傳的魔物資料
  useEffect(() => {
    async function fetchData() {
      const result = await fetchMonsterLocation();
      if (result) {
        setData(result);
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      {/* 選擇魔物 */}
      <div className="flex gap-2 items-center">
        <button
          className="w-max btn justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer] py-2 px-4  font-bold "
          onClick={toggleCollapse}
        >
          {isCollapsed ? "打開魔物搜尋欄" : "收起魔物搜尋欄"}
        </button>
      </div>
      {!isCollapsed && (
        <>
          <div
            className="bg-slate-50 mt-2 rounded-lg py-2 px-3 shadow-md max-h-40 
      overflow-y-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-y-4 gap-x-2"
          >
            {monsterNames.map((monster, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <input
                  type="checkbox"
                  id={`monsterCheckbox${index}`}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-600 accent-lime-600"
                  value={monster}
                  checked={selectedMonster.includes(monster)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedMonster((prev) => {
                      if (prev.includes(value)) {
                        return prev.filter((item) => item !== value);
                      } else {
                        return [...prev, value];
                      }
                    });
                  }}
                />
                <label
                  className="text-sm md:text-base text-gray-800"
                  htmlFor={`monsterCheckbox${index}`}
                >
                  <Image
                    className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer] h-8 w-8 md:w-12 md:h-12"
                    src={`/assets/icons/Monster/${monster}.svg`}
                    width={50}
                    height={50}
                    alt="equipment"
                    loading="lazy"
                  />
                </label>
              </div>
            ))}
          </div>
        </>
      )}
      {/* 選擇地區 */}
      <div className="w-full">
        <Listbox
          value={selectedRegion}
          onChange={(newSelectedRegion) => setSelectedRegion(newSelectedRegion)}
        >
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 w-1/2">
            <h3 className="text-xl lg:text-2xl font-bold mt-2">搜尋地區</h3>
          </Listbox.Label>
          <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-pointer">
            <span className="block truncate">
              {selectedRegion ? selectedRegion : city}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 pl-3 shadow-md max-h-40 overflow-y-auto">
              {LocationList.length === 0 ? (
                <Listbox.Option
                  className="relative cursor-pointer rounded-md select-none py-2 pl-8 pr-4 text-gray-900"
                  value=""
                >
                  還未搜尋到有魔物的地區
                </Listbox.Option>
              ) : (
                LocationList.map((city, index) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-pointer rounded-md select-none py-2 pl-8 pr-4 ${
                        active ? "bg-slate-800 text-white" : "text-gray-900"
                      }`
                    }
                    key={index}
                    value={city}
                  >
                    {city}
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
      <button
        type="button"
        onClick={openModal}
        className="w-full btn justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]  font-bold mt-8 mb-4 text-base shadow-color"
      >
        上傳魔物資訊
      </button>
      {/* 魔物資訊 */}
      <MapTable data={data} monster={selectedMonster} city={selectedRegion} />
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
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
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
