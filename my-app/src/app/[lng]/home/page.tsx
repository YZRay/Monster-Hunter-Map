"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import dynamic from "next/dynamic";

const DiscordBot = dynamic(() => import("@/components/DiscordBot"), {
  ssr: false,
});

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
