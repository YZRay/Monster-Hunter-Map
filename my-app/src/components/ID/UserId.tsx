"use client";

import { useState, useEffect } from "react";
import uuid from "react-uuid";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);
  //是否是無痕模式
  const [isPrivateMode, setIsPrivateMode] = useState(false);

  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("useId");

      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        //創建新的id
        const newUserId = uuid();
        localStorage.setItem("useId", newUserId);
        setUserId(newUserId);
      }
    } catch (e) {
      console.error("localStorage error:", e);
      //如果獲取不到localStorage就設定為是無痕模式
      setIsPrivateMode(true);
    }
  }, []);
  return { userId, isPrivateMode };
};

export default useUserId;
