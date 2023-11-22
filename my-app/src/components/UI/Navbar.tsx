import Link from "next/link";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import FieldIcon from "../../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../../public/assets/icons/monster_icon.svg";
import AboutIcon from "../../../public/assets/icons/about.svg";
import NewsIcon from "../../../public/assets/icons/news.svg";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <Fragment>
      <div className="container flex justify-end">
        <button
          className="text-lg p-2 xl:hidden right-0"
          onClick={() => setShow(!show)}
        >
          <Bars3BottomRightIcon className="w-8" />
        </button>
      </div>
      <div className="container hidden xl:flex my-4 bg-slate-400 p-1 rounded-md gap-1 md:gap-4 top-0 z-30 shadow-lg bg-opacity-95">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "active" : ""
          } monster-tab flex items-center md:gap-2 text-lg`}
        >
          <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
          地圖資訊
        </Link>
        <Link
          href="/equipment"
          className={`${
            pathname === "/equipment" ? "active" : ""
          } monster-tab flex items-center gap-2 text-lg`}
        >
          <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
          配裝資訊
        </Link>
        <Link
          href="/news"
          className={`${
            pathname === "/news" ? "active" : ""
          } monster-tab flex items-center gap-2 text-lg`}
        >
          <Image src={NewsIcon} alt="MonsterIcon" width={40} height={40} />
          最新消息
        </Link>
        <Link
          href="/about"
          className={`${
            pathname === "/about" ? "active" : ""
          } monster-tab flex items-center gap-2 text-lg`}
        >
          <Image src={AboutIcon} alt="MonsterIcon" width={40} height={40} />
          關於我們
        </Link>
      </div>
      <MobileNavbar show={show} toggleShow={toggleShow} />
    </Fragment>
  );
};

export default Navbar;
