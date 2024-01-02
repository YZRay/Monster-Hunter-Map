"use client";
import { FC, Fragment } from "react";
import WidgetBot from "@widgetbot/react-embed";
import { useTranslation } from "react-i18next";

const DiscordBot: FC = () => {
  const { t } = useTranslation("monster");
  const { t: transMonster } = useTranslation("data");

  return (
    <div className="sticky top-16">
      <WidgetBot
        server="1191603191075311646"
        channel="1191603191515729993"
        height={800}
        width={350}
      />
    </div>
  );
};

export default DiscordBot;
