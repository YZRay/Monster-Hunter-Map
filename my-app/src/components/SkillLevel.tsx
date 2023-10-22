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
      <div className="max-w-7xl mx-auto grid grid-cols-5 my-2 bg-gray-100 pb-4 pt-8 px-8 rounded-md flex-wrap shadow-md bg-opacity-90 gap-x-8 gap-y-4">
        {Object.keys(skill).map((skillName) => {
          const skillObject = skills[skillName];
          const skillLevel = skill[skillName];
          const skillContentIndex = skillLevel - 1;
          const skillContent = skillObject?.content?.[skillContentIndex];

          return (
            <div key={skillName} className="flex flex-col gap-1 items-start">
              <div className="flex justify-around gap-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {skillObject?.name}
                </h3>
                <span className="text-gray-800 font-bold">Lv{skillLevel}</span>
              </div>
              <div className="flex">
                {[...Array(skillLevel)].map((_, index) => (
                  <span
                    className="bg-[#2DB4FF] h-4 w-6 mr-1 skew-x-[-20deg] border-solid border-2 border-[#313131]"
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
