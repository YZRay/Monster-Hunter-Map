import { Dialog, Transition, Tab } from "@headlessui/react";
import { FC, useState, Fragment } from "react";
import Image from "next/image";
import MonsterTableData from "../Table/MonsterTable";
import MonsterMaterial from "../Table/Material";
import MonsterStatusEffect from "../Table/StatusEffect";
import MonsterEcology from "../Table/Ecology";

interface MonsterModalProps {
  open: boolean;
  onClose: () => void;
  monsterData: Monster | null;
}

const MonsterModal: FC<MonsterModalProps> = ({
  open,
  onClose,
  monsterData,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 z-50" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto z-50">
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-100 p-6 text-left align-middle shadow-xl transition-all border-2 border-teal-800 border-double">
                <Dialog.Title className="text-3xl font-bold text-gray-500 pb-2">
                  狩獵指南
                </Dialog.Title>
                <hr className="border-gray-400" />
                <Tab.Group>
                  <Tab.List className="grid grid-cols-2 md:grid-cols-4 gap-1 my-4 bg-slate-400 p-1 rounded-md">
                    <Tab className="monster-tab">部位與肉質</Tab>
                    <Tab className="monster-tab">生態</Tab>
                    <Tab className="monster-tab">狀態異常</Tab>
                    <Tab className="monster-tab">素材</Tab>
                  </Tab.List>

                  {/*  */}
                  <div className="flex items-center m-10 gap-4 flex-col lg:flex-row">
                    <Image
                      className=""
                      src={`/assets/icons/Monster/${monsterData?.name}.svg`}
                      width={300}
                      height={300}
                      alt="equipment"
                      loading="lazy"
                    />
                    <h3 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
                      {monsterData?.name}
                      <p className="text-base mt-4 hidden lg:inline-block">
                        魔物介紹魔物介紹魔物介紹魔物介紹魔物介紹魔物介紹魔物介紹魔物介紹魔物介紹
                      </p>
                    </h3>
                  </div>
                  <Tab.Panels>
                    <Tab.Panel>
                      <p className="text-sm text-gray-800">
                        解鎖等級：{monsterData?.unlock}
                      </p>
                      <MonsterTableData data={monsterData?.name} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <p className="text-sm text-gray-800">
                        解鎖等級：{monsterData?.unlock}
                      </p>
                      <MonsterEcology data="生態" />
                    </Tab.Panel>
                    <Tab.Panel>
                      <MonsterStatusEffect data="狀態異常" />
                    </Tab.Panel>
                    <Tab.Panel>
                      <MonsterMaterial data="素材" />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="w-1/4 justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer] bg-slate-400 py-2 text-white font-bold hover:bg-slate-800 duration-300"
                    onClick={onClose}
                  >
                    關閉
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MonsterModal;
