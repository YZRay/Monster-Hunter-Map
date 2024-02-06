"use client";
import "../globals.css";
import React, { FC, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCoffee } from "react-icons/fa";

const AboutPage: FC = () => {
  return (
    <main className="container">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-300 text-center">
        關於我們
      </h1>
      <div className="text-lg flex flex-col xl:flex-row justify-between my-10">
        <Image
          src="/assets/img/about.jpg"
          className="w-full xl:w-1/2"
          alt="加入好友"
          width="512"
          height="512"
          loading="lazy"
        />
        <div>
          <p className="my-5">
            我們是一群熱愛魔物獵人的玩家，因為喜愛所以熱於分享
            <br />
            透過開發這個小服務希望可以讓更多玩家可以熱於其中
          </p>
          <p className="my-5">
            如果有合作需求，歡迎寄信到 :{" "}
            <Link href="mailto:josh@mhnow.cc">josh@mhnow.cc</Link>
          </p>
          <p className="my-5">
            如果覺得我們做的不錯 :{" "}
            <Link
              href="https://www.buymeacoffee.com/mhnow.cc"
              target="_blank"
              className="flex items-center"
            >
              <img src="https://img.buymeacoffee.com/button-api/?text=buy me a beer&emoji=&slug=mhnow.cc&button_colour=5F7FFF&font_colour=ffffff&font_family=Bree&outline_colour=000000&coffee_colour=FFDD00" />
            </Link>
          </p>
          <p className="my-5">
            <Link
              href={"https://lin.ee/g3FujGH"}
              target="_blank"
              className={`monster-tab-mobile flex items-center gap-2 text-lg`}
            >
              <img
                src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                alt="加入好友"
                height="24"
              ></img>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
