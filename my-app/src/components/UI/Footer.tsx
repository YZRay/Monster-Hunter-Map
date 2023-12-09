"use client";
import Link from "next/link";
import urlBuilder from "@/utility/urlBuilder";
import { Fragment } from "react";
import { useTranslation } from "../../app/i18n/client";

const Footer = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "monster");

  return (
    <Fragment>
      <footer className="py-2 bg-slate-900 dark:bg-slate-800 relative bottom-0 w-full">
        <div className="text-white dark:text-slate-200 text-center">
          <Link href={`${urlBuilder(lng, "privacy")}`} locale={lng}>
            {t("navigation.privacy")}
          </Link>{" "}
          |
          <Link href={`${urlBuilder(lng, "terms")}`} locale={lng}>
            {t("navigation.terms")}
          </Link>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
