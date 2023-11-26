import Link from "next/link";
import React from "react";
import Image from "next/image";
import FieldIcon from "../../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../../public/assets/icons/monster_icon.svg";
import AboutIcon from "../../../public/assets/icons/about.svg";
import NewsIcon from "../../../public/assets/icons/news.svg";
import { usePathname } from "next/navigation";

export default function Navigation({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <div className="w-full xl:w-max xl:flex gap-4">
      <Link
        href={`/${locale}`}
        locale={locale}
        className={`${
          pathname === "/" || pathname === `/${locale}` ? "active" : ""
        } px-4 py-3 mb-2 xl:mb-0 xl:py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md justify-center flex items-center md:gap-2 text-lg`}
      >
        <Image
          className="hidden xl:inline-block"
          src={FieldIcon}
          alt="FieldIcon"
          width={40}
          height={40}
        />
        {t("map")}
      </Link>
      <Link
        href={`/${locale}/equipment`}
        locale={locale}
        className={`${
          pathname.includes("equipment") ? "active" : ""
        } px-4 py-3 mb-2 xl:mb-0 xl:py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md justify-center flex items-center gap-2 text-lg`}
      >
        <Image
          className="hidden xl:inline-block"
          src={MonsterIcon}
          alt="MonsterIcon"
          width={40}
          height={40}
        />
        {t("setting")}
      </Link>
      <Link
        href={`/${locale}/news`}
        className={`${
          pathname.includes("news") ? "active" : ""
        } px-4 py-3 mb-2 xl:mb-0 xl:py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md justify-center flex items-center gap-2 text-lg`}
      >
        <Image
          className="hidden xl:inline-block"
          src={NewsIcon}
          alt="MonsterIcon"
          width={40}
          height={40}
        />
        {t("new")}
      </Link>
      <Link
        href={`/${locale}/about`}
        className={`${
          pathname.includes("about") ? "active" : ""
        } px-4 py-3 mb-2 xl:mb-0 xl:py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md justify-center flex items-center gap-2 text-lg`}
      >
        <Image
          className="hidden xl:inline-block"
          src={AboutIcon}
          alt="MonsterIcon"
          width={40}
          height={40}
        />
        {t("about")}
      </Link>
    </div>
  );
}
