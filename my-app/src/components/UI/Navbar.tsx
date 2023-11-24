"use client";
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
      <div className="px-2 md:px-6 lg:px-8 mb-4 sticky top-0 z-30 xl:hidden flex items-center justify-between bg-opacity-95 bg-slate-200 shadow-md py-2">
        <h1 className="font-bold text-lg text-slate-800">
          Monster Hunter Now 魔物地圖
        </h1>
        <button className="text-lg p-2 right-0" onClick={() => setShow(!show)}>
          <Bars3BottomRightIcon className="w-8" />
        </button>
      </div>
      <div className="w-full hidden xl:flex md:mb-6 p-1 rounded-md gap-1 justify-around items-center sticky top-0 z-30 bg-opacity-95 bg-slate-200 shadow-md py-2">
        <h1 className="font-bold text-xl text-slate-800">
          Monster Hunter Now 魔物地圖
        </h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "active" : ""
            } px-4 py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md flex items-center md:gap-2 text-lg`}
          >
            <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
            地圖資訊
          </Link>
          <Link
            href="/equipment"
            className={`${
              pathname === "/equipment" ? "active" : ""
            } px-4 py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md flex items-center gap-2 text-lg`}
          >
            <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
            配裝資訊
          </Link>
          <Link
            href="/news"
            className={`${
              pathname === "/news" ? "active" : ""
            } px-4 py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md flex items-center gap-2 text-lg`}
          >
            <Image src={NewsIcon} alt="MonsterIcon" width={40} height={40} />
            最新消息
          </Link>
          <Link
            href="/about"
            className={`${
              pathname === "/about" ? "active" : ""
            } px-4 py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md flex items-center gap-2 text-lg`}
          >
            <Image src={AboutIcon} alt="MonsterIcon" width={40} height={40} />
            關於我們
          </Link>
        </div>
      </div>
      <MobileNavbar show={show} toggleShow={toggleShow} />
    </Fragment>
  );
};

export default Navbar;
