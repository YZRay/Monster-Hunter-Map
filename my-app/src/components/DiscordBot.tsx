"use client";
import { FC, Fragment, useState } from "react";
import WidgetBot from "@widgetbot/react-embed";
import { useTranslation } from "react-i18next";
import { BsDiscord } from "react-icons/bs";
import { Tooltip, Button } from "@nextui-org/react";

const DiscordBot: FC = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  const { t } = useTranslation("monster");
  const { t: transMonster } = useTranslation("data");

  return (
    <Fragment>
      <Tooltip
        placement="top"
        content="一起來聊天吧！"
        className="z-50 bg-slate-100 rounded-lg text-slate-800"
      >
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Chat Message"
          onClick={() => setShow(!show)}
          className="fixed bottom-10 left-6 rounded-full p-3 bg-slate-100 drop-shadow-md z-50"
        >
          <BsDiscord className="w-8 h-8 text-slate-700" />
        </Button>
      </Tooltip>
      <div
        className={`fixed top-0 xl:top-20 z-40 transition-all duration-500 ${
          show ? "right-0" : "-right-full"
        }`}
      >
        <WidgetBot
          server="1191603191075311646"
          channel="1191603191515729993"
          height={800}
          className="w-[300px] xl:w-[400px] h-full"
        />
      </div>
    </Fragment>
  );
};

export default DiscordBot;
