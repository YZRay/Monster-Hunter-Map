import Link from "next/link";
import { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import Navigation from "./Navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitch from "@/components/ThemeSwitch";

interface IProps {
  show: boolean;
  toggleShow: () => void;
  lng: string;
}
const MobileNavbar = ({ show, toggleShow, lng }: IProps) => {
  const ModalOverlay = () => (
    <div
      className={`flex xl:hidden fixed top-0 right-0 bottom-0 left-0 bg-slate-400 dark:bg-slate-950 opacity-50 z-30 transition-all duration-500`}
      onClick={() => toggleShow()}
    />
  );
  const pathname = usePathname();

  useEffect(() => {
    // 在 modal 打開時禁止背景滾動
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      // 在 modal 關閉時還原背景滾動
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);
  return (
    <Fragment>
      <div
        className={`shadow-md w-64 h-screen xl:hidden flex flex-col items-end gap-2 p-4 bg-slate-200 dark:bg-slate-800 fixed top-0 transition-all duration-500  z-50 ${
          show ? "right-0" : "-right-full"
        }`}
      >
        <button
          className="p-2 mb-2 hover:rotate-180 transition-all duration-300"
          onClick={() => toggleShow()}
        >
          <RxCross1 className="w-8 h-8" />
        </button>
        <Navigation lng={lng} />
        <LanguageSwitcher lng={lng} />
        <ThemeSwitch />
        <Link
          href={"https://lin.ee/g3FujGH"}
          target="_blank"
          className={`monster-tab-mobile flex items-center gap-2 text-lg`}
        >
          <img
            src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
            alt="加入好友"
            height="24"
          ></img>
        </Link>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </Fragment>
  );
};

export default MobileNavbar;
