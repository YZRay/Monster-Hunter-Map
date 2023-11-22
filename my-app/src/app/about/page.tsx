"use client";
import "../globals.css";
import React, { FC, useState, Fragment } from "react";
import Navbar from "../../components/UI/Navbar";
import Link from "next/link";

const AboutPage: FC = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <h1 className="text-lg">關於我們</h1>
        <p className="my-5">
          我們是一群熱愛魔物獵人的玩家，因為喜愛所以熱於分享<br/>
          透過開發這個小服務希望可以讓更多玩家可以熱於其中
        </p> 
        <p className="my-5">
          如果有合作需求，歡迎寄信到 : <Link href="mailto:josh@mhnow.cc" >josh@mhnow.cc</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default AboutPage;
