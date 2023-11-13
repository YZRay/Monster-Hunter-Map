"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import MonsterMap from "@/components/MonsterMap";
import Navbar from "../components/UI/Navbar";

const HomePage: FC = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <MapSelection />
        <MonsterMap />
      </div>
    </Fragment>
  );
};

export default HomePage;
