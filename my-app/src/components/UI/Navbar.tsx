"use client";
import React, { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "../../app/i18n/client";
import Navigation from "./Navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = ({ lng }: { lng: string }) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  const { t } = useTranslation(lng, "monster");

  return (
    <Fragment>
      <div className="px-2 md:px-6 lg:px-8 mb-4 sticky top-0 z-30 xl:hidden flex items-center justify-between bg-opacity-95 bg-slate-200 shadow-md py-2">
        <h1 className="font-bold text-lg text-slate-800">{t("title")}</h1>
        <button className="text-lg p-2 right-0" onClick={() => setShow(!show)}>
          <Bars3BottomRightIcon className="w-8" />
        </button>
      </div>
      <div className="w-full hidden xl:flex md:mb-6 p-1 rounded-md gap-1 justify-around items-center sticky top-0 z-30 bg-opacity-95 bg-slate-200 shadow-md py-2">
        <h1 className="font-bold text-xl text-slate-800">{t("title")}</h1>
        <div className="flex gap-4">
          <Navigation lng={lng} />
          <LanguageSwitcher />
        </div>
      </div>
      <MobileNavbar show={show} toggleShow={toggleShow} lng={lng} />
    </Fragment>
  );
};

export default Navbar;
