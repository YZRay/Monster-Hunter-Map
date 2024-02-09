import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Countdown from "react-countdown";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const CountdownTimer = ({
  endTime,
  createdTime,
  id,
}: {
  endTime: string;
  createdTime: string;
  id: number;
}) => {
  const { t } = useTranslation("monster");
  const createdAt = new Date(createdTime + "Z").getTime();
  const endTimes = new Date(endTime + "Z").getTime();
  const currentTime = new Date().getTime();

  const hasEnded = endTimes > currentTime;

  let formattedTime;

  if (createdAt !== endTimes && hasEnded) {
    formattedTime = (
      <Countdown
        date={endTimes}
        renderer={({ minutes, seconds, completed }) => {
          if (completed) {
            return null;
          } else {
            return (
              <div className="flex gap-1 items-center text-base">
                <MdOutlineAccessTimeFilled className="w-5 h-5" /> {minutes}:
                {seconds.toString().padStart(2, "0")}
              </div>
            );
          }
        }}
      />
    );
  } else {
    formattedTime = <div> {t("MonsterMap.finished")}</div>;
  }

  return <Fragment>{formattedTime}</Fragment>;
};

export default CountdownTimer;
