// MonsterCard.tsx
import { FC } from "react";
import { HiClipboardDocument, HiFaceSmile, HiFaceFrown } from "react-icons/hi2";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("monster");
  const { t: transMonster } = useTranslation("data");

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

  //翻譯名字
  const trans = monsterNames.map((monsterName) => {
    return transMonster(`equipSetting.${monsterName}.name`);
  });
  const translatedMonsterNamesString = trans.join(", ");

  return (
    <div
      className="flex flex-col border border-transparent text-base lg:text-lg font-bold bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-500/50
        text-slate-800 rounded-md shadow-md p-4 hover:bg-slate-800 hover:text-slate-200 duration-300 dark:hover:bg-slate-300 dark:hover:text-slate-800 
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
                  <FaStar
                    key={index}
                    className={`w-5 h-5 drop-shadow-md ${
                      item.level > 5 ? "text-purple-600" : "text-amber-400"
                    }`}
                  />
                )
              )}
            </div>
            <div>
              <p className="text-base">
                {/* {monsterNames.join(", ")} */}
                {translatedMonsterNamesString}
              </p>
              <span className="text-base">
                {item.round} {t("MonsterMap.round")}
              </span>
            </div>
          </div>
          <div>
            <HiClipboardDocument
              title={t("copytips")}
              className="w-6 h-6 cursor-pointer absolute top-0 right-0"
              onClick={() => copyToClipboard(item.coordinates)}
            />
          </div>
        </div>
        <div
          className="flex items-center gap-1 mt-2 cursor-pointer"
          onClick={() => onCardClick(item)}
        >
          <FaLocationDot className="w-5 h-5" title={t("openMap")} />
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
              <HiFaceSmile
                title={t("reportGood")}
                className="w-6 h-6 cursor-pointer"
                onClick={() => sendReport(true, userId, item)}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="">{item.badLocations.length}</span>
              <HiFaceFrown
                title={t("reportBad")}
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
