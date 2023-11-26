"use client";
import Link from "next/link";

const language = [
  { id: 0, lan: "zhTW", name: "中" },
  { id: 1, lan: "en", name: "Eng" },
  { id: 2, lan: "jp", name: "日" },
];

export default function LanguageSwitcher() {
  return (
    <div className="flex gap-2 items-center justify-center w-full xl:w-fit">
      {language.map((lang) => (
        <Link
          key={lang.id}
          href={`/${lang.lan}`}
          locale={lang.lan}
          className="py-1 px-4 text-sm rounded-md hover:text-white hover:bg-slate-800 transition-all duration-300"
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
}
