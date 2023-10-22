import { Fragment, FC } from "react";
import data from "../data/data.json";

const SkillLevel: FC<SkillLevelProps> = ({ skill }) => {
  if (Object.keys(skill).length === 0) {
    // 如果還沒選取任何裝備就回傳null
    return null;
  }
  const skills: Skills = data.baseSetting.skills;

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto grid grid-cols-5 my-2 bg-gray-100 pb-4 pt-8 px-8 rounded-md flex-wrap shadow-md bg-opacity-90 gap-x-8 gap-y-4 sticky top-16 z-30">
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
              <div className="flex justify-around gap-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {skillObject?.name}
                </h3>
                <span
                  className={`font-bold text-lg ${
                    displayedSkillLevel === skillLevelLimit
                      ? "text-[#E0AD55] ease-linear duration-300"
                      : "text-gray-800"
                  }`}
                >
                  Lv
                  {displayedSkillLevel}
                </span>
              </div>
              <div className="flex">
                {[...Array(skillLevelLimit)].map((_, index) => (
                  <span
                    className={`h-4 w-6 mr-1 skew-x-[-20deg] border-solid border-2 border-[#313131] ${
                      index < displayedSkillLevel
                        ? "bg-[#2DB4FF] ease-linear duration-300"
                        : "bg-gray-600"
                    }`}
                    key={index}
                  ></span>
                ))}
              </div>
              <p className="mb-4 font-bold text-gray-700">{skillContent}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default SkillLevel;
