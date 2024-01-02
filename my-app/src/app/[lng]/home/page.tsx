"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import DiscordBot from "@/components/DiscordBot";

const HomePage: FC = () => {
  return (
    <Fragment>
      <DiscordBot />
      <div className="container">
        <MapSelection />
      </div>
    </Fragment>
  );
};

export default HomePage;
