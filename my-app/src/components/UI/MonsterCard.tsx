// MonsterCard.tsx
import { FC } from "react";
import { HiClipboardDocument, HiFaceSmile, HiFaceFrown } from "react-icons/hi2";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Divider } from "@nextui-org/react";
import CountdownTimer from "../CountdownTimer";

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
    <div className="max-w-[4rem] max-h-[4rem] relative" key={index}>
      <Image
        className="w-auto h-auto drop-shadow"
        src={`/assets/icons/Monster/${monsterName}.svg`}
        width={50}
        height={50}
        alt="equipment"
        loading="lazy"
      />
      {item.isHuntAThons && (
        <Image
          className="h-9 w-9 absolute top-0 right-0 translate-x-[25%] translate-y-[-25%]"
          src={`/assets/icons/Monster/hunt-a-thons.svg`}
          width={36}
          height={36}
          alt="equipment"
          loading="lazy"
        />
      )}
    </div>
  ));

  //翻譯名字
  const trans = monsterNames.map((monsterName) => {
    return transMonster(`equipSetting.${monsterName}.name`);
  });
  const translatedMonsterNamesString = trans.join(", ");

  return (
    <div
      className="group flex flex-col border border-transparent text-base lg:text-lg font-bold bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-500/50
        text-slate-800 rounded-md shadow-md p-3 hover:bg-slate-800 hover:text-slate-200 duration-300 dark:hover:bg-slate-300 dark:hover:text-slate-800 
        "
    >
      <div className="justify-around flex-wrap">
        <div className="flex gap-4 relative items-center">
          {imageElements}
          <div className="flex-1">
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
            <div className="flex flex-col gap-1">
              <p className="text-base">{translatedMonsterNamesString}</p>
              <div className="flex items-center gap-3 h-auto">
                <span className="text-base">
                  {item.round} {t("MonsterMap.round")}
                </span>
                {item.isHuntAThons && (
                  <>
                    <Divider
                      orientation="vertical"
                      className="h-4 bg-slate-800 group-hover:bg-slate-300 dark:bg-slate-200 dark:group-hover:bg-slate-800 transition-all duration-300"
                    />
                    <span>
                      <CountdownTimer
                        endTime={item.remainingTime}
                        createdTime={item.createdAt}
                        id={item.id}
                      />
                    </span>
                  </>
                )}
              </div>
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
        <div className="flex items-center justify-between mt-2">
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
