"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import Navbar from "../components/UI/Navbar";

import useUserId from "@/components/ID/UserId";

const HomePage: FC = () => {
  const userId = useUserId();
  console.log(userId);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <MapSelection />
      </div>
    </Fragment>
  );
};

export default HomePage;
