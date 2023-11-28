import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Navigation from "./Navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface IProps {
  show: boolean;
  toggleShow: () => void;
  lng: string;
}
const MobileNavbar = ({ show, toggleShow, lng }: IProps) => {
  const ModalOverlay = () => (
    <div
      className={`flex xl:hidden fixed top-0 right-0 bottom-0 left-0 bg-slate-400 opacity-50 z-30 transition-all duration-500`}
      onClick={() => toggleShow()}
    />
  );
  const pathname = usePathname();
  return (
    <Fragment>
      <div
        className={`border shadow-md w-64 h-screen xl:hidden flex flex-col items-end gap-2 p-4 bg-slate-200 fixed top-0 transition-all duration-500 z-50 ${
          show ? "right-0" : "-right-full"
        }`}
      >
        <button
          className="p-2 mb-2 hover:rotate-180 transition-all duration-300"
          onClick={() => toggleShow()}
        >
          <XMarkIcon className="w-8"></XMarkIcon>
        </button>
        <Navigation lng={lng} />
        <LanguageSwitcher lng={lng} />
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
