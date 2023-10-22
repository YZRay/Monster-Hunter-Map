import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { log } from "console";

const monster = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: false },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const taiwanRegions = [
  { id: 1, name: "台北" },
  { id: 2, name: "新北" },
  { id: 3, name: "桃園" },
  { id: 4, name: "台中" },
  { id: 5, name: "台南" },
  // 添加更多台湾地区
];

const MapSelection = () => {
  const [selectedMonster, setSelectedMonster] = useState(monster[0]);
  const [selectedMonsterLevel, setSelectedMonsterLevel] = useState(
    monster[0].id
  );
  const [selectedRegion, setSelectedRegion] = useState(taiwanRegions[0]);
  const city = selectedRegion.name;
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    // 發送 GET 請求
    fetch(`https://api.mhnow.cc/api/monsterlocation?l=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [city]);

  console.log(data);

  return (
    <Fragment>
      {/* 選擇魔物 */}
      <Listbox value={selectedMonster} onChange={setSelectedMonster}>
        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
          <h1 className="text-xl font-bold mt-2">選取魔物</h1>
        </Listbox.Label>
        <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
          <span className="block truncate">{selectedMonster.name}</span>
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
          <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 px-3 shadow-md">
            {monster.map((monster) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
                    active ? "bg-slate-800 text-white" : "text-gray-900"
                  }`
                }
                key={monster.id}
                value={monster}
              >
                {monster.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      {/* 選擇魔物等級 */}
      <div className="flex gap-4">
        <div className="w-full">
          <Listbox
            value={selectedMonsterLevel}
            onChange={setSelectedMonsterLevel}
          >
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              <h1 className="text-xl font-bold mt-2">魔物等級</h1>
            </Listbox.Label>
            <Listbox.Button className="relative rounded-lg w-full bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
              <span className="block truncate">{selectedMonsterLevel}星</span>
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
              <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 px-3 shadow-md ">
                {monster.map((monster) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
                        active ? "bg-slate-800 text-white" : "text-gray-900"
                      }`
                    }
                    key={monster.id}
                    value={monster.id}
                  >
                    {monster.id}星
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
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
              <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 pl-3 shadow-md">
                {taiwanRegions.map((region) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-pointer rounded-md select-none py-2 pl-8 pr-4 ${
                        active ? "bg-slate-800 text-white" : "text-gray-900"
                      }`
                    }
                    key={region.id}
                    value={region}
                  >
                    {region.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
    </Fragment>
  );
};

export default MapSelection;
