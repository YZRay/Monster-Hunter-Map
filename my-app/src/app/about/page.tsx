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
      </div>
    </Fragment>
  );
};

export default AboutPage;