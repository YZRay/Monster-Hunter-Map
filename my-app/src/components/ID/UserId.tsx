"use client";

import { useState, useEffect } from "react";
import uuid from "react-uuid";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("useId");

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      //創建新的id
      const newUserId = uuid();
      localStorage.setItem("useId", newUserId);
      setUserId(newUserId);
    }
  }, []);
  return userId;
};

export default useUserId;
