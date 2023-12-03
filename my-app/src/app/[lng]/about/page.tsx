"use client";
import "../globals.css";
import React, { FC, Fragment } from "react";
import Link from "next/link";
import { FaCoffee } from "react-icons/fa";

const AboutPage: FC = () => {
  return (
    <main>
      <div className="container">
        <h1 className="text-lg">關於我們</h1>
        <p className="my-5 flex items-center gap-2 text-lg">
          <img
            src="/assets/img/about.jpg"
            alt="加入好友"
            width="50%"
            height="24"
          ></img>
        </p>
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
            href="https://p.ecpay.com.tw/D5FEAC2"
            target="_blank"
            className="flex w-fit items-center btn gap-2 text-base rounded-md font-bold py-2 px-4 mt-2"
          >
            <FaCoffee />
            歡迎請我們喝杯咖啡
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
    </main>
  );
};

export default AboutPage;
