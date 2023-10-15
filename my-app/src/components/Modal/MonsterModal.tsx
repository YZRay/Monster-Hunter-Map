import { Dialog, Transition } from "@headlessui/react";
import { FC, useState, Fragment } from "react";

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
  console.log(monsterData);

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
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title>查看魔物資訊</Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{monsterData?.name}</p>
                  <p className="text-sm text-gray-500">{monsterData?.id}</p>
                  <p className="text-sm text-gray-500">{monsterData?.unlock}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900"
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
