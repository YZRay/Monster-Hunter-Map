"use client";
import React, { FC, Fragment } from "react";
import QueryProvider from "@/components/Providers/QueryProvider";
import MapSelection from "@/components/MapSelection";

const HomePage: FC = () => {
  return (
    <QueryProvider>
      <div className="container">
        <MapSelection />
      </div>
    </QueryProvider>
  );
};

export default HomePage;
