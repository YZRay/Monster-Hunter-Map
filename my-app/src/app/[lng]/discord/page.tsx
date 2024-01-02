"use client";
import { FC, Fragment, useState, useEffect, useCallback } from "react";
import WidgetBot from '@widgetbot/react-embed'
import { useTranslation } from "react-i18next";


const DiscordPage: FC = () => {
  const { t } = useTranslation("monster");
  const { t: transMonster } = useTranslation("data");

  return (
    <div className="container">
    <WidgetBot
      server="1191603191075311646"
      channel="1191603191515729993"
      height={800}
    />
    </div>
  );
};

export default DiscordPage;
