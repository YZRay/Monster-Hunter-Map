import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const monster = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

const MapSelection = () => {
  const [selectedMonster, setSelectedMonster] = useState(monster[0]);

  return (
    <Fragment>
      <Listbox value={selectedMonster} onChange={setSelectedMonster}>
        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
          <h1 className="text-2xl font-bold mt-2">選取魔物</h1>
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
          <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 pl-3 shadow-md">
            {monster.map((monster) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-10 pr-4 ${
                    active ? "bg-slate-800 text-white" : "text-gray-900"
                  }`
                }
                key={monster.id}
                value={monster}
                disabled={monster.unavailable}
              >
                {monster.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </Fragment>
  );
};

export default MapSelection;
