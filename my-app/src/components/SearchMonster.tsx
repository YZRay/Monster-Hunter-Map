// MonsterSearch.js
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, FC } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { FaCoffee } from "react-icons/fa";
import Image from "next/image";
interface SearchMonsterProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  monsterNames: string[];
  selectedMonster: string[];
  handleMonsterSelection: (value: string) => void;
  city: string;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  LocationList: string[];
}
const SearchMonster: FC<SearchMonsterProps> = ({
  monsterNames,
  selectedMonster,
  handleMonsterSelection,
  city,
  selectedRegion,
  setSelectedRegion,
  LocationList,
  isCollapsed,
  toggleCollapse,
}) => {
  const { t } = useTranslation("monster");

  return (
    <Fragment>
      {/* 搜尋魔物 */}
      <div className="flex justify-between items-center mb-4 md:mb-0 flex-wrap gap-2">
        <button
          className="w-max btn justify-center rounded-md py-2 px-4  font-bold"
          onClick={toggleCollapse}
        >
          {isCollapsed ? `${t("MonsterMap.open")}` : `${t("MonsterMap.close")}`}
        </button>
        <Link
          href="https://www.buymeacoffee.com/mhnow.cc"
          target="_blank"
          className="flex items-center"
        >
          <img
            className=""
            src="https://img.buymeacoffee.com/button-api/?text=buy me a beer&emoji=&slug=mhnow.cc&button_colour=5F7FFF&font_colour=ffffff&font_family=Bree&outline_colour=000000&coffee_colour=FFDD00"
            width="217"
            height="50"
          />
        </Link>
      </div>
      {!isCollapsed && (
        <>
          {/* 選擇魔物 */}
          <div
            className="bg-slate-50 dark:bg-slate-700 mt-2 rounded-lg py-2 px-3 shadow-md max-h-40 
          overflow-y-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-y-4 gap-x-2"
          >
            {monsterNames.map((monster, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <input
                  type="checkbox"
                  id={`monsterCheckbox${index}`}
                  className="w-5 h-5 text-blue-600 bg-gray-100 dark:bg-gray-100 border-gray-300 rounded focus:ring-lime-600 accent-lime-600"
                  value={monster}
                  checked={selectedMonster.includes(monster)}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleMonsterSelection(value);
                  }}
                />
                <label
                  className="text-sm md:text-base text-gray-800"
                  htmlFor={`monsterCheckbox${index}`}
                >
                  <Image
                    className="h-8 w-8 md:w-12 md:h-12"
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
      {/* 地區搜尋 */}
      <div className="w-full">
        <Listbox
          value={selectedRegion}
          onChange={(newSelectedRegion) => setSelectedRegion(newSelectedRegion)}
        >
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 dark:text-gray-300">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold my-2">
              {t("MonsterMap.searchArea")}
            </h3>
          </Listbox.Label>
          <Listbox.Button className="relative w-full rounded-lg bg-white dark:bg-slate-700/80 py-2 px-3 pr-10 text-left shadow-md cursor-pointer">
            <span className="block truncate">
              {selectedRegion ? selectedRegion : city}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="container absolute bg-slate-50 dark:bg-slate-700 mt-2 rounded-lg py-2 px-3 shadow-md max-h-40 overflow-y-auto">
              {LocationList === null || LocationList.length === 0 ? (
                <Listbox.Option
                  className="relative cursor-pointer rounded-md select-none py-2 pl-8 pr-4 text-gray-900"
                  value=""
                >
                  No regions with monsters found yet
                </Listbox.Option>
              ) : (
                LocationList.map((city, index) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-pointer rounded-md select-none py-2 pl-8 pr-4 ${
                        active
                          ? "bg-slate-800 text-white"
                          : "text-gray-900 dark:text-gray-200"
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
    </Fragment>
  );
};

export default SearchMonster;
