"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import DiscordBot from "@/components/DiscordBot";

const HomePage: FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4 w-11/12 mx-auto">
      <div className="xl:col-span-3">
        <DiscordBot />
      </div>
      <div className="col-span-12 xl:col-span-9 w-full xl:w-3/4">
        <MapSelection />
      </div>
    </div>
  );
};

export default HomePage;
