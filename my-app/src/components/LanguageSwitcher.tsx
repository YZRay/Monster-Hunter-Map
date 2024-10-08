"use client";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi2";
import urlBuilder from "@/utility/urlBuilder";

const language = [
  { id: 0, lan: "zh-Hant-TW", lng: "中" },
  { id: 1, lan: "en", lng: "Eng" },
  { id: 2, lan: "ja", lng: "日" },
];

export default function LanguageSwitcher({ lng }: { lng: string }) {
  const selectedLanguage = language.find((item) => item.lan === lng);

  return (
    <div className="flex gap-2 items-center justify-center w-full xl:w-fit">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white  transition-all duration-300">
            {selectedLanguage ? selectedLanguage.lng : ""}
            <HiChevronDown
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-primary shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 flex flex-col gap-2">
              {language.map((lang) => (
                <Menu.Item key={lang.id}>
                  {({ active }) => (
                    <Link
                      href={`${urlBuilder(lang.lan, "/")}`}
                      locale={lang.lan}
                      className="py-1 px-4 text-sm rounded-md hover:text-white hover:bg-slate-700 transition-all duration-300"
                    >
                      {lang.lng}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
