import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface IProps {
  show: boolean;
  toggleShow: () => void;
}
const MobileNavbar = ({ show, toggleShow }: IProps) => {
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
        <Link
          href="/"
          className={`${
            pathname === "/" ? "active" : ""
          } monster-tab-mobile flex items-center md:gap-2 text-lg`}
        >
          地圖資訊
        </Link>
        <Link
          href="/SelectionPage"
          className={`${
            pathname === "/SelectionPage" ? "active" : ""
          } monster-tab-mobile flex items-center gap-2 text-lg`}
        >
          魔物資訊
        </Link>
        <Link
          href="/news"
          className={`${
            pathname === "/news" ? "active" : ""
          } monster-tab-mobile flex items-center gap-2 text-lg`}
        >
          最新消息
        </Link>
        <Link
          href="/about"
          className={`${
            pathname === "/about" ? "active" : ""
          } monster-tab-mobile flex items-center gap-2 text-lg`}
        >
          關於我們
        </Link>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </Fragment>
  );
};

export default MobileNavbar;
