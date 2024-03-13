import { FC, useState } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import useUserId from "../Hook/UserId";
import {
  createBadLocation,
  createGoodLocation,
  queryClient,
} from "./../api/MLApi";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const MonsterMap = dynamic(() => import("@/components/MonsterMap"), {
  ssr: false,
});
const MonsterCard = dynamic(() => import("@/components/UI/MonsterCard"), {
  ssr: false,
});

interface MapTableProps {
  data: GetResponse | null;
  monster: string[];
  city: string | null;
}

const MapTable: FC<MapTableProps> = ({ data, monster, city }) => {
  const { t } = useTranslation("monster");
  //點擊卡片設定魔物資料
  const [selectMonster, setSelectMonster] = useState<DataItem | null>(null);
  //打開modal
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  async function copyTextToClipboard(coordinates: string) {
    try {
      // 使用 Clipboard API 写入剪贴板
      await navigator.clipboard.writeText(coordinates);
      toast.success(`${t("MonsterMap.copy")}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error(`${t("MonsterMap.copyFailed")}`, err);
    }
  }
  const userId = useUserId();
  const [isCreateing, setIsCreateing] = useState(false);

  const { mutate: createGood } = useMutation({
    mutationFn: createGoodLocation,
  });

  const { mutate: createBad } = useMutation({
    mutationFn: createBadLocation,
  });

  const sendReport = (
    isGood: boolean,
    uid: string | null,
    mlitem: DataItem
  ) => {
    if (isCreateing || !uid) {
      return;
    }
    var loading = toast.loading(`${t("MonsterMap.reporting")}`);

    setIsCreateing(true);

    var model = {
      uid: uid,
      mlid: mlitem.id,
    };

    if (isGood) {
      createGood(model, {
        onSuccess: (data) => {
          toast.dismiss(loading);
          data.json().then((data) => {
            if (!data.status) {
              toast.error(`${t("MonsterMap.error")}`, {
                position: "top-center",
                className: "danger",
                autoClose: 1500, // 1.5秒關閉
              });
            } else {
              toast.success(`${t("MonsterMap.success")}`, {
                position: "top-center",
                autoClose: 1500, // 1.5秒關閉
              });
              mlitem.goodLocations.push(model);
            }

            setIsCreateing(false);

            queryClient.invalidateQueries({
              queryKey: ["monsterList"],
            });
          });
        },
        onError: () => {
          toast.error(`${t("MonsterMap.failed")}`, {
            position: "top-center",
            autoClose: 1500,
          });
          queryClient.invalidateQueries({
            queryKey: ["monsterList"],
          });
          setIsCreateing(false);
        },
      });
    } else {
      createBad(model, {
        onSuccess: (data) => {
          toast.dismiss(loading);
          data.json().then((data) => {
            if (!data.status) {
              toast.error(`${t("MonsterMap.error")}`, {
                position: "top-center",
                className: "danger",
                autoClose: 1500,
              });
            } else {
              toast.success(`${t("MonsterMap.success")}`, {
                position: "top-center",
                autoClose: 1500,
              });

              mlitem.badLocations.push(model);
            }
            queryClient.invalidateQueries({
              queryKey: ["monsterList"],
            });

            setIsCreateing(false);
          });
        },
        onError: () => {
          toast.error(`${t("MonsterMap.failed")}`, {
            position: "top-center",
            autoClose: 1500,
          });
          queryClient.invalidateQueries({
            queryKey: ["monsterList"],
          });
          setIsCreateing(false);
        },
      });
    }
  };

  //最多只會有兩個魔物的名字
  const processedData =
    data?.data.map((item) => ({
      ...item,
      monsterNames: item.name.split(",").slice(0, 2),
    })) || [];

  //篩選魔物
  const filteredData = processedData.filter((item) => {
    const cityCondition = city === "全部" || item.location === city;
    if (monster.length === 0) {
      //如果沒有選擇任何魔物就篩選city就好
      return cityCondition;
    } else {
      // 檢查 item.monsterNames (前兩個名字) 是否包含選擇的魔物
      const isMonsterSelected = monster.some((selectedMonster) =>
        item.monsterNames.includes(selectedMonster)
      );
      return cityCondition && isMonsterSelected;
    }
  });

  //獲取卡片資料
  const handleCardClick = (clickedItem: DataItem) => {
    //設定魔物資料
    setSelectMonster(clickedItem);
    //打開modal
    openModal();
  };

  //地圖卡片資訊
  const monsterLocationCards = filteredData.map((item) => (
    <MonsterCard
      key={item.id}
      item={item}
      monsterNames={item.monsterNames}
      onCardClick={handleCardClick}
      copyToClipboard={copyTextToClipboard}
      sendReport={sendReport}
      userId={userId.userId || null}
    />
  ));

  return (
    <div className="mt-2 mb-4 md:mb-8 md:mt-4 lg:mb-16">
      {/* 目擊資訊 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-2 md:gap-y-4">
        {monsterLocationCards}
      </div>
      {/* 地圖modal */}
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
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
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="container w-[90vw] transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2"
                  >
                    {t("MonsterMap.monsterMap")}－{selectMonster?.location}
                  </Dialog.Title>
                  <MonsterMap
                    //這邊用不到 所以寫null，只要傳入點擊到的卡片資料
                    geolocation={{
                      latitude: selectMonster?.lat || null,
                      longitude: selectMonster?.lng || null,
                    }}
                    data={data}
                    monster={selectMonster?.name || []}
                    monsterData={selectMonster}
                  />
                  <button
                    type="button"
                    className="monster-tab"
                    onClick={closeModal}
                  >
                    {t("MonsterMap.closeMap")}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MapTable;
