"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import useUserId from "@/components/Hook/UserId";

const HomePage: FC = () => {
  const userId = useUserId();

  return (
    <Fragment>
      <div className="container">
        <MapSelection />
      </div>
    </Fragment>
  );
};

export default HomePage;
