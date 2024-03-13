"use client";
import React, { FC } from "react";
import QueryProvider from "@/components/Providers/QueryProvider";
import MapSelection from "@/components/MapSelection";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const HomePage: FC = () => {
  return (
    <QueryProvider>
      <div className="container">
        <ReactQueryDevtools />
        <MapSelection />
      </div>
    </QueryProvider>
  );
};

export default HomePage;
