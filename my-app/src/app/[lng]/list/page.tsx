"use client";
import { FC, Fragment, useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa6";
import {
  fetchMonsterLocation
} from "@/components/api/MLApi";
import { useTranslation } from "react-i18next";


const ListPage: FC = () => {
  const { t } = useTranslation("monster");
  const { t: transMonster } = useTranslation("data");

  const [data, setData] = useState<GetResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      // 獲取上傳的魔物資料
      const monsterDataResult = await fetchMonsterLocation();
      if (monsterDataResult) {
        setData(monsterDataResult);
      }
    }
    fetchData();
  }, []);

  //最多只會有兩個魔物的名字
  const processedData =
    data?.data.map((item) => ({
      ...item,
      monsterNames: item.name.split(",").slice(0, 2),
    })) || [];

    const translatedMonsterNamesString = function(monsterNames : string []) { 
      const trans = monsterNames.map((monsterName) => {
        return transMonster(`equipSetting.${monsterName}.name`);
      })
      return trans.join(", ");
    }

  return (
    <div className="container">
      <table className="w-full text-left table-auto min-w-max" >
        <thead>
          <tr>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">時間</th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">魔物星數</th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">魔物名稱</th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">週目</th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">座標</th></tr>
        </thead>
        <tbody>
          {
            processedData.map((item) => {
              return (
                <tr key={item.id} >
                  <td className="p-4 border-b border-blue-gray-50">
                    {(() => {
                      const date = new Date(item.createdAt + "Z");
                      const localTime = date.toLocaleString(undefined, {
                        hour12: false,
                      });
                      return localTime;
                    })()}
                  </td >
                  <td className="p-4 border-b border-blue-gray-50" >
                    { item.level }
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                  {
                    translatedMonsterNamesString(item.monsterNames)
                  }  
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {item.round} {t("MonsterMap.round")}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {item.coordinates}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;
