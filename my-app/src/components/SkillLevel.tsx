import { Fragment, FC, useState } from "react";
import data from "../data/data.json";

const SkillLevel: FC<SkillLevelProps> = ({ skill }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (Object.keys(skill).length === 0) {
    // 如果還沒選取任何裝備就回傳null
    return null;
  }
  const skills: Skills = data.baseSetting.skills;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Fragment>
      <div className="max-w-full mx-1 sm:mx-4 md:max-w-xl lg:max-w-2xl xl:max-w-7xl md:mx-auto mt-4">
        <button
          className=" w-max justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer] bg-slate-400 py-2 px-4 text-white font-bold hover:bg-slate-800 duration-300"
          onClick={toggleCollapse}
        >
          {isCollapsed ? "查看技能" : "收起技能資訊"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="max-w-full mx-1 sm:mx-4 md:max-w-xl lg:max-w-2xl xl:max-w-7xl md:mx-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 my-2 bg-gray-100 pb-2 pt-4 px-8 rounded-md shadow-md bg-opacity-90 gap-x-8 gap-y-4">
          {Object.keys(skill).map((skillName) => {
            const skillObject = skills[skillName];
            const skillLevel = skill[skillName];
            const skillLevelLimit = skillObject.content.length;
            // 如果大於最高限制就回傳最後一個
            const skillContentIndex =
              skillLevel - 1 >= skillLevelLimit
                ? skillLevelLimit - 1
                : skillLevel - 1;
            const skillContent = skillObject?.content?.[skillContentIndex];
            // 如果大於最高等級限制，就回傳回傳上限等級
            const displayedSkillLevel =
              skillLevel > skillLevelLimit ? skillLevelLimit : skillLevel;

            return (
              <div key={skillName} className="flex flex-col gap-1 items-start">
                <div className="flex justify-around items-center gap-4">
                  <h3 className="font-bold text-sm md:text-md lg:text-lg text-gray-800">
                    {skillObject?.name}
                  </h3>
                  <span
                    className={`font-bold text-base lg:text-lg ${
                      displayedSkillLevel === skillLevelLimit
                        ? "text-[#E0AD55] ease-linear duration-300"
                        : "text-gray-800"
                    }`}
                  >
                    Lv
                    {displayedSkillLevel}
                  </span>
                </div>
                <div className="flex ">
                  {[...Array(skillLevelLimit)].map((_, index) => (
                    <span
                      className={`h-3 w-4 xl:h-4 xl:w-6 xl:mr-1 mr-[2px] skew-x-[-10deg] lg:skew-x-[-20deg] border-solid border-[1px] lg:border-2 border-[#313131] ${
                        index < displayedSkillLevel
                          ? "bg-[#2DB4FF] ease-linear duration-300"
                          : "bg-gray-500"
                      }`}
                      key={index}
                    ></span>
                  ))}
                </div>
                <p className="md:mb-4 text-sm lg:text-base font-bold text-gray-700">
                  {skillContent}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default SkillLevel;
