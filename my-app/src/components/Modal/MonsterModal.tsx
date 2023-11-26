import { Dialog, Transition, Tab } from "@headlessui/react";
import { FC, Fragment } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const MonsterTableData = dynamic(() => import("../Table/MonsterTable"), {
  ssr: false,
});
const MonsterMaterial = dynamic(() => import("../Table/Material"), {
  ssr: false,
});
const MonsterStatusEffect = dynamic(() => import("../Table/StatusEffect"), {
  ssr: false,
});
const MonsterEcology = dynamic(() => import("../Table/Ecology"), {
  ssr: false,
});

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
  const { t } = useTranslation("monster");
  const { t: trans } = useTranslation("data");

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
                  {t("MonsterMap.huntingGuide")}
                </Dialog.Title>
                <hr className="border-gray-400" />
                <Tab.Group>
                  <Tab.List className="grid grid-cols-2 md:grid-cols-4 gap-1 my-4 bg-slate-400 p-1 rounded-md">
                    <Tab className="monster-tab">
                      {" "}
                      {t("MonsterMap.hitzone")}
                    </Tab>
                    <Tab className="monster-tab">{t("MonsterMap.impact")}</Tab>
                    <Tab className="monster-tab">
                      {t("MonsterMap.weakness")}
                    </Tab>
                    <Tab className="monster-tab">
                      {t("MonsterMap.material")}
                    </Tab>
                  </Tab.List>

                  {/*  */}
                  <div className="flex items-center m-5 lg:m-10 gap-4 flex-col lg:flex-row">
                    <Image
                      className="w-32 h-32"
                      src={`/assets/icons/Monster/${monsterData?.name}.svg`}
                      width={300}
                      height={300}
                      alt="equipment"
                      loading="lazy"
                    />
                    <h3 className="text-lg xl:text-3xl font-bold text-gray-800 text-center lg:text-left">
                      {monsterData?.name}
                      <p className="text-base mt-4 hidden lg:inline-block"></p>
                    </h3>
                  </div>
                  <Tab.Panels>
                    <Tab.Panel>
                      <p className="text-sm text-gray-800">
                        {t("MonsterMap.unlock")}：{monsterData?.unlock}
                      </p>
                      <MonsterTableData data={monsterData?.name} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <p className="text-sm text-gray-800">
                        {t("MonsterMap.unlock")}：{monsterData?.unlock}
                      </p>
                      <MonsterEcology data={monsterData} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <MonsterStatusEffect data={monsterData} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <MonsterMaterial data={monsterData} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="w-1/4 justify-center rounded-md bg-slate-400 py-2 text-white font-bold hover:bg-slate-800 duration-300"
                    onClick={onClose}
                  >
                    {t("MonsterMap.closeModal")}
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
