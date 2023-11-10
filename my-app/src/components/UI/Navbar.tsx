import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";
import FieldIcon from "../../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../../public/assets/icons/monster_icon.svg";

const Navbar = () => {
  return (
    <Fragment>
      <div className="container flex my-4 bg-slate-400 p-1 rounded-md gap-1 md:gap-4 top-0 z-30 shadow-lg bg-opacity-95">
        <Link
          href="/"
          className="monster-tab flex items-center md:gap-2 text-lg"
        >
          <Image src={FieldIcon} alt="FieldIcon" width={40} height={40} />
          地圖資訊
        </Link>
        <Link
          href="/SelectionPage"
          className="monster-tab flex items-center gap-2 text-lg"
        >
          <Image src={MonsterIcon} alt="MonsterIcon" width={40} height={40} />
          魔物資訊
        </Link>
      </div>
    </Fragment>
  );
};

export default Navbar;
