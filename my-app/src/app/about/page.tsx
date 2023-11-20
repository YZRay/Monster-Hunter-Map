"use client";
import "../globals.css";
import React, { FC, useState, Fragment } from "react";
import Navbar from "../../components/UI/Navbar";

const AboutPage: FC = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <h1>關於我們</h1>
        <p>
          我們是一群熱愛魔物獵人的玩家，因為喜愛所以熱於分享<br/>
          透過開發這個小服務希望可以讓更多玩家可以熱於其中
        </p>
      </div>
    </Fragment>
  );
};

export default AboutPage;