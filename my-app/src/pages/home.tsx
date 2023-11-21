"use client";
import React, { FC, Fragment } from "react";
import MapSelection from "@/components/MapSelection";
import Navbar from "../components/UI/Navbar";
import useUserId from "@/components/Hook/UserId";

const HomePage: FC = () => {
  const userId = useUserId();
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
