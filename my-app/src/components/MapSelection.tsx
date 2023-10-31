import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { fetchMonsterLocation } from "./api/Location";
import MapTable from "./Table/MapTable";
import MonsterForm from "./form/MonsterForm";
import taiwanCity from "../data/taiwanCity.json";
import monster from "../data/data.json";

const monsterNames = Object.values(monster.equipSetting)
  .filter(
    (armor) => !armor.name.includes("皮製") && !armor.name.includes("礦石")
  )
  .map((armor) => armor.name);

const MapSelection = () => {
  const [selectedMonster, setSelectedMonster] = useState(monsterNames[0]);
  const [selectedRegion, setSelectedRegion] = useState(taiwanCity[0]);
  const city = selectedRegion.name;

  const [data, setData] = useState<GetResponse | null>(null);
  useEffect(() => {
    async function fetchData() {
      const result = await fetchMonsterLocation(city);
      if (result) {
        setData(result);
      }
    }

    fetchData();
  }, [city]);

  return (
    <Fragment>
      {/* 選擇魔物 */}
      <h1 className="text-2xl font-bold mb-2 text-gray-800">搜尋魔物資訊</h1>
      <Listbox value={selectedMonster} onChange={setSelectedMonster}>
        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
          <h1 className="text-xl font-bold mt-2">魔物名稱</h1>
        </Listbox.Label>
        <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
          <span className="block truncate">{selectedMonster}</span>
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
          <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 px-3 shadow-md max-h-40 overflow-y-auto">
            {monsterNames.map((monster, index) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
                    active ? "bg-slate-800 text-white" : "text-gray-900"
                  }`
                }
                key={index}
                value={monster}
              >
                {monster}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      {/* 選擇地區 */}
      <div className="w-full">
        <Listbox value={selectedRegion} onChange={setSelectedRegion}>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 w-1/2">
            <h1 className="text-xl font-bold mt-2">地區</h1>
          </Listbox.Label>
          <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-pointer">
            <span className="block truncate">{selectedRegion.name}</span>
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
              {taiwanCity.map((city) => (
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-pointer rounded-md select-none py-2 pl-8 pr-4 ${
                      active ? "bg-slate-800 text-white" : "text-gray-900"
                    }`
                  }
                  key={city.id}
                  value={city}
                >
                  {city.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
      <MapTable data={data} monster={selectedMonster} city={city} />
      <MonsterForm />
    </Fragment>
  );
};

export default MapSelection;
