import { FC, useState } from "react";
import {
  StarIcon,
  ClipboardDocumentIcon,
  MapPinIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import useUserId from "../ID/UserId";
import { createBadLocation } from "./../api/MLApi";
import dynamic from "next/dynamic";

const MonsterMap = dynamic(() => import("@/components/MonsterMap"), {
  ssr: false,
});

interface MapTableProps {
  data: GetResponse | null;
  monster: string[];
  city: string | null;
}

const MapTable: FC<MapTableProps> = ({ data, monster, city }) => {
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
      console.log("已成功複製");
      toast.success("已複製位置", {
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
      console.error("複製失敗：", err);
    }
  }
  const userId = useUserId();
  const [isCreateing, setIsCreateing] = useState(false);

  const sendBad = (uid: string | null, mlitem: DataItem) => {
    if (isCreateing || !uid) {
      return;
    }

    var loading = toast.loading("回報中！");

    setIsCreateing(true);

    var model = {
      uid: uid,
      mlid: mlitem.id,
    };

    createBadLocation(model)
      .then((response) => {
        if (!response.ok) {
          toast.error("網路回應發生錯誤", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.dismiss(loading);
        if (!data.status) {
          toast.error("回報失敗！", {
            position: "top-center",
            className: "danger",
            autoClose: 1500, // 1.5秒關閉
          });
        } else {
          toast.success("回報成功！", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });

          mlitem.badLocations.push(model);
        }

        setIsCreateing(false);
      })
      .catch((error) => {
        console.error("Error submit Form", error);
      })
      .finally(() => {});
  };
  //最多只會有三個魔物的名字
  const processedData =
    data?.data.map((item) => ({
      ...item,
      monsterNames: item.name.split(",").slice(0, 3),
    })) || [];

  //篩選魔物
  const filteredData = processedData.filter((item) => {
    const cityCondition = city === "全部" || item.location === city;
    if (monster.length === 0) {
      //如果沒有選擇任何魔物就篩選city就好
      return cityCondition;
    } else {
      // 檢查 item.monsterNames (前三個名字) 是否包含選擇的魔物
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
  const locationTable = filteredData.map((item) => {
    const imageElements = item.monsterNames.map((monsterName, index) => (
      <div className="max-w-[4rem] max-h-[4rem]" key={index}>
        <Image
          className="w-auto h-auto drop-shadow"
          src={`/assets/icons/Monster/${monsterName}.svg`}
          width={50}
          height={50}
          alt="equipment"
          loading="lazy"
        />
      </div>
    ));

    return (
      <div
        className="flex flex-col text-base lg:text-lg font-bold cursor-pointer bg-slate-300 
        text-slate-800 rounded-md shadow-md p-4 hover:bg-slate-800 hover:text-slate-200 duration-300 
        "
        key={item.id}
        onClick={() => handleCardClick(item)}
      >
        <div className="justify-around flex-wrap">
          <div className="flex gap-4 relative items-center">
            {imageElements}
            <div className="basis-1/2">
              <div className="flex gap-1">
                {Array.from(
                  { length: item.level > 5 ? item.level - 5 : item.level },
                  (_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-5 h-5 drop-shadow-md ${
                        item.level > 5 ? "text-purple-600" : "text-amber-400"
                      }`}
                    />
                  )
                )}
              </div>
              <div>
                <p className="text-base">{item.monsterNames.join(", ")}</p>
                <p className="text-base">
                  {(() => {
                    const date = new Date(item.createdAt + "Z");
                    const localTime = date.toLocaleString(undefined, {
                      hour12: false,
                    });
                    return localTime;
                  })()}
                </p>
                <span className="text-base">{item.round} 周目</span>
              </div>
            </div>
            <div>
              <ClipboardDocumentIcon
                title="複製"
                className="w-6 h-6 cursor-pointer absolute top-0 right-0"
                onClick={() => {
                  copyTextToClipboard(`${item.coordinates}`);
                }}
              />
              <FaceSmileIcon
                title="回報正確定位"
                className="w-6 h-6 cursor-pointer absolute top-15 right-0"
                onClick={() => {
                  sendBad(userId.userId || "", item);
                }}
              />
              <div className="absolute right-10">
                {item.badLocations.length}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 ">
            <MapPinIcon className="w-5 h-8" />
            <span className="text-base">
              {item.location} - {item.coordinates}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="mt-2 mb-4 md:mb-8 md:mt-4 lg:mb-16">
      <ToastContainer />
      {/* <h1 className="text-xl lg:text-2xl font-bold mb-2 text-gray-800">
        魔物目擊地圖資訊
      </h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-2 md:gap-y-4">
        {locationTable}
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
                <Dialog.Panel className="w-[80vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    魔物地圖
                  </Dialog.Title>
                  <MonsterMap
                    //這邊用不到 所以寫null，只要傳入點擊到的卡片資料
                    geolocation={{
                      latitude: selectMonster?.lat || null,
                      longitude: selectMonster?.lng || null,
                    }}
                    data={null}
                    monster={selectMonster?.name || []}
                    monsterData={selectMonster}
                  />
                  <button
                    type="button"
                    className="monster-tab mt-4"
                    onClick={closeModal}
                  >
                    關閉地圖
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
