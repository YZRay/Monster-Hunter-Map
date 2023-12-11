"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";

const HomePage: FC = () => {
  return (
    <Fragment>
      <div className="container">
        <MapSelection />
      </div>
    </Fragment>
  );
};

export default HomePage;
