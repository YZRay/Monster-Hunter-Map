// MonsterCard.tsx
import { FC } from "react";
import {
  StarIcon,
  ClipboardDocumentIcon,
  MapPinIcon,
  FaceSmileIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

interface MonsterCardProps {
  item: DataItem;
  monsterNames: string[];
  onCardClick: (clickedItem: DataItem) => void;
  copyToClipboard: (coordinates: string) => void;
  sendReport: (isGood: boolean, uid: string | null, mlitem: DataItem) => void;
  userId: string | null;
}

const MonsterCard: FC<MonsterCardProps> = ({
  item,
  monsterNames,
  onCardClick,
  copyToClipboard,
  sendReport,
  userId,
}) => {
  const imageElements = monsterNames.map((monsterName, index) => (
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
      className="flex flex-col text-base lg:text-lg font-bold bg-slate-300 
        text-slate-800 rounded-md shadow-md p-4 hover:bg-slate-800 hover:text-slate-200 duration-300 
        "
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
              <p className="text-base">{monsterNames.join(", ")}</p>
              <span className="text-base">{item.round} 周目</span>
            </div>
          </div>
          <div>
            <ClipboardDocumentIcon
              title="複製"
              className="w-6 h-6 cursor-pointer absolute top-0 right-0"
              onClick={() => copyToClipboard(item.coordinates)}
            />
          </div>
        </div>
        <div
          className="flex items-center gap-1 mt-2 cursor-pointer"
          onClick={() => onCardClick(item)}
        >
          <MapPinIcon className="w-5 h-8" title="開啟地圖" />
          <span className="text-base">
            {item.location} - {item.coordinates}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-base">
            {(() => {
              const date = new Date(item.createdAt + "Z");
              const localTime = date.toLocaleString(undefined, {
                hour12: false,
              });
              return localTime;
            })()}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="">{item.goodLocations.length}</span>
              <FaceSmileIcon
                title="回報正確定位"
                className="w-6 h-6 cursor-pointer"
                onClick={() => sendReport(true, userId, item)}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="">{item.badLocations.length}</span>
              <FaceFrownIcon
                title="回報錯誤定位"
                className="w-6 h-6 cursor-pointer"
                onClick={() => sendReport(false, userId, item)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;
