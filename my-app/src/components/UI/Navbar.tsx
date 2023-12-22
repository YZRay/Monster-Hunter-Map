"use client";
import React, { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { HiBars3 } from "react-icons/hi2";
import { useTranslation } from "../../app/i18n/client";
import Navigation from "./Navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Headroom from "react-headroom";
import urlBuilder from "@/utility/urlBuilder";
import ThemeSwitch from "@/components/ThemeSwitch";

const Navbar = ({ lng }: { lng: string }) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  const { t } = useTranslation(lng, "monster");

  return (
    <Fragment>
      <Headroom
        className={`${
          pathname.includes("/equipment") ? "mb-0" : "mb-4 xl:mb-0"
        }`}
      >
        <div className="px-2 md:px-6 lg:px-8 z-50 xl:hidden flex items-center justify-between bg-opacity-95 bg-slate-200 dark:bg-slate-700 shadow-md py-2">
          <h1 className="font-bold text-lg text-slate-800 dark:text-slate-200">
            <Link href={`${urlBuilder(lng, "/")}`} locale={lng}>
              {t("title")}
            </Link>
          </h1>
          <button
            className="text-lg p-2 right-0"
            onClick={() => setShow(!show)}
          >
            <HiBars3 className="w-8 h-8" />
          </button>
        </div>
      </Headroom>
      <Headroom
        className={`${pathname.includes("/equipment") ? "mb-0" : "md:mb-6"}`}
      >
        <div className="w-full hidden xl:flex p-1 rounded-md gap-1 justify-around items-center z-50 bg-opacity-95 bg-slate-200 dark:bg-slate-800 shadow-md py-2">
          <h1 className="font-bold text-xl text-slate-800 dark:text-slate-200">
            <Link href={`${urlBuilder(lng, "/")}`} locale={lng}>
              {t("title")}
            </Link>
          </h1>
          <div className="flex gap-4 items-center">
            <Navigation lng={lng} />
            <LanguageSwitcher lng={lng} />
            <ThemeSwitch />
          </div>
        </div>
      </Headroom>
      <MobileNavbar show={show} toggleShow={toggleShow} lng={lng} />
    </Fragment>
  );
};

export default Navbar;
