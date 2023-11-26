"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import FieldIcon from "../../../public/assets/icons/field_icon.svg";
import MonsterIcon from "../../../public/assets/icons/monster_icon.svg";
import AboutIcon from "../../../public/assets/icons/about.svg";
import NewsIcon from "../../../public/assets/icons/news.svg";
import { usePathname } from "next/navigation";
import { useTranslation } from "../../app/i18n/client";

export default function Navigation({ lng }: { lng: string }) {
  const pathname = usePathname();
  const { t } = useTranslation(lng, "data");

  return (
    <div className="w-full xl:w-max xl:flex gap-4">
      <Link
        href={`/${lng}`}
        locale={lng}
        className={`${
          pathname === "/" || pathname === `/${lng}` ? "active" : ""
        } px-4 py-3 mb-2 xl:mb-0 xl:py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md justify-center flex items-center md:gap-2 text-lg`}
      >
        <Image
          className="hidden xl:inline-block"
          src={FieldIcon}
          alt="FieldIcon"
          width={40}
          height={40}
        />
        {t("navigation.map")}
      </Link>
      <Link
        href={`/${lng}/equipment`}
        locale={lng}
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
        {t("navigation.setting")}
      </Link>
      <Link
        href={`/${lng}/news`}
        locale={lng}
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
        {t("navigation.new")}
      </Link>
      <Link
        href={`/${lng}/about`}
        locale={lng}
        className={`${
          pathname.includes("navigation.about") ? "active" : ""
        } px-4 py-3 mb-2 xl:mb-0 xl:py-1 hover:bg-slate-800 hover:text-white transition-all duration-500 rounded-md justify-center flex items-center gap-2 text-lg`}
      >
        <Image
          className="hidden xl:inline-block"
          src={AboutIcon}
          alt="MonsterIcon"
          width={40}
          height={40}
        />
        {t("navigation.about")}
      </Link>
    </div>
  );
}
