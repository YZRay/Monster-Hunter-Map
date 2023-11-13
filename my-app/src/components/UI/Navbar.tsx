import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";
import FieldIcon from "../../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../../public/assets/icons/monster_icon.svg";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <Fragment>
      <div className="container flex my-4 bg-slate-400 p-1 rounded-md gap-1 md:gap-4 top-0 z-30 shadow-lg bg-opacity-95">
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
          href="/SelectionPage"
          className={`${
            pathname === "/SelectionPage" ? "active" : ""
          } monster-tab flex items-center gap-2 text-lg`}
        >
          <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
          魔物資訊
        </Link>
        <Link
          href="/news"
          className={`${
            pathname === "/news" ? "active" : ""
          } monster-tab flex items-center gap-2 text-lg`}
        >
          <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
          最新消息
        </Link>
        <Link
          href="/about"
          className={`${
            pathname === "/about" ? "active" : ""
          } monster-tab flex items-center gap-2 text-lg`}
        >
          <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
          關於我們
        </Link>
      </div>
    </Fragment>
  );
};

export default Navbar;
