import { Transition, Dialog, Tab } from "@headlessui/react";
import { Fragment, useState, useEffect, useCallback } from "react";
import FieldIcon from "../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../public/assets/icons/monster_icon.svg";
import { useTranslation } from "react-i18next";
import {
  fetchMonsterLocation,
  GetlocationList,
  queryClient,
} from "./api/MLApi";
import { getGeolocationData } from "./api/GeolocationAPI";
import Image from "next/image";
import monster from "../data/data.json";
import dynamic from "next/dynamic";
import SearchMonster from "./SearchMonster";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const MapTable = dynamic(() => import("./Table/MapTable"));
const MonsterForm = dynamic(() => import("./form/MonsterForm"), {
  ssr: false,
});
const MonsterMap = dynamic(() => import("@/components/MonsterMap"), {
  ssr: false,
});
const monsterNames = Object.entries(monster.equipSetting)
  .filter(
    ([key, armor]) =>
      !key.includes("leather") && !key.includes("alloy") && armor.mapShow
  )
  .map(([key, armor]) => key);

const MapSelection = () => {
  const { t } = useTranslation("monster");
  const {
    data: monsterList,
    isLoading: isMonsterListLoading,
    isError: isMonsterListError,
  } = useQuery({
    queryKey: ["monsterList"],
    queryFn: fetchMonsterLocation,
  });
  const { data: monsterData } = useQuery({
    queryKey: ["monsterData"],
    queryFn: GetlocationList,
  });

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

  const [city, setCity] = useState("全部");
  const [selectedMonster, setSelectedMonster] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>("全部");
  const [geolocation, setGeolocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  } | null>(null);

  async function handleFormSubmitted() {
    try {
      queryClient.invalidateQueries({
        queryKey: ["monsterData"],
      });
      // 獲取上傳的魔物資料
      await toast.promise(fetchMonsterLocation(), {
        pending: `Loading ...`,
        success: "取得成功",
        error: "發生錯誤",
      });
    } catch (error) {
      console.error("發生錯誤", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      // 載入經緯度數據
      getGeolocationData((geoData) => {
        setGeolocation(geoData);
      });
    }
    fetchData();
  }, []);

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
        LocationList={monsterData ? monsterData.data : []}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      {/* 上傳魔物表單 */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={openModal}
          className="w-full btn justify-center rounded-md font-bold my-4 md:my-8 text-base shadow-color"
        >
          {t("MonsterMap.upload")}
        </button>
        <button
          type="button"
          onClick={handleFormSubmitted}
          className="w-full btn justify-center rounded-md font-bold my-4 md:my-8 text-base shadow-color"
        >
          {t("MonsterMap.download")}
        </button>
      </div>
      {/* 切換動態地圖 */}
      <Tab.Group>
        <Tab.List className="flex items-center gap-4 mb-4 mt-1">
          <Tab className="monster-tab flex items-center md:gap-2 text-lg py-2">
            <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
            {t("MonsterMap.eyewitness")}
          </Tab>
          <Tab className="monster-tab flex items-center md:gap-2 text-lg py-2">
            <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
            {t("MonsterMap.dynamicMap")}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {/* 魔物上傳資訊 */}
            {isMonsterListLoading && (
              <div className="flex justify-center items-center h-52">
                <Spinner
                  label="The page is loading, please wait..."
                  color="primary"
                  labelColor="foreground"
                />
              </div>
            )}
            {isMonsterListError && (
              <p className="text-center">Something went wrong.</p>
            )}
            {monsterList && (
              <MapTable
                data={monsterList}
                monster={selectedMonster}
                city={selectedRegion}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {/* 動態地圖 */}
            {isMonsterListLoading && (
              <div className="flex justify-center items-center h-52">
                <Spinner
                  label="The page is loading, please wait..."
                  color="primary"
                  labelColor="foreground"
                />
              </div>
            )}
            {monsterList && (
              <MonsterMap
                geolocation={geolocation}
                data={monsterList}
                monster={selectedMonster}
                monsterData={null}
              />
            )}
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
                <Dialog.Panel className="w-full max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-600 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-800 dark:text-gray-200"
                  >
                    {t("MonsterMap.share")}
                  </Dialog.Title>
                  <MonsterForm onSubmitted={handleFormSubmitted} />
                  <button
                    type="button"
                    className="w-full justify-center rounded-md bg-slate-400 dark:bg-slate-700 py-2 text-white font-bold hover:bg-slate-800 dark:hover:bg-slate-500 duration-300 border border-transparent dark:border-slate-400/50"
                    onClick={closeModal}
                  >
                    {t("MonsterMap.cancel")}
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
