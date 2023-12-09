import { Fragment, FC, useState } from "react";
import data from "../data/data.json";
import { useTranslation } from "react-i18next";
import { HiInformationCircle } from "react-icons/hi";

const SkillLevel: FC<SkillLevelProps> = ({ skill, isArmorOpen }) => {
  const { t } = useTranslation("monster");
  const { t: skillsName } = useTranslation("data");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSkillContentShow, setIsSkillContentShow] = useState(false);

  if (Object.keys(skill).length === 0) {
    // 如果還沒選取任何裝備就回傳null
    return null;
  }
  const skills: Skills = data.baseSetting.skills;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleSkillContentShow = () => {
    setIsSkillContentShow(!isSkillContentShow);
  };
  return (
    <Fragment>
      <div className="mt-4">
        <button
          className=" w-max justify-center rounded-md btn py-2 px-4 font-bold "
          onClick={toggleCollapse}
        >
          {isCollapsed
            ? `${t("SkillSetting.watch")}`
            : `${t("SkillSetting.hide")}`}
        </button>
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-1 my-2 bg-gray-100 dark:bg-slate-600 bg-opacity-90 border border-transparent dark:border-slate-300/50 py-4 px-8 rounded-md shadow-md gap-x-8 gap-y-2 relative">
          <button onClick={toggleSkillContentShow}>
            <HiInformationCircle className="text-gray-800 dark:text-gray-200 w-6 h-6 absolute top-2 right-2 hover:text-gray-600 dark:hover:text-gray-50 transition-colors duration-200" />
          </button>
          {Object.entries(skill).map(([skillName, skillLevel]) => {
            const skillObject = skills[skillName];
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
                  <h3 className="font-bold text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200">
                    {skillsName(`baseSetting.skills.${skillName}.name`)}
                  </h3>
                  <span
                    className={`font-bold text-base lg:text-lg ${
                      displayedSkillLevel === skillLevelLimit
                        ? "text-[#E0AD55] dark:text-yellow-300 ease-linear duration-300"
                        : "text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    Lv
                    {displayedSkillLevel}
                  </span>
                </div>
                <div className="flex ">
                  {[...Array(skillLevelLimit)].map((_, index) => (
                    <span
                      className={`h-4 w-6 mr-[2px] skew-x-[-10deg] lg:skew-x-[-20deg] border-solid border-[1px] lg:border-2 border-[#313131] ${
                        index < displayedSkillLevel
                          ? "bg-[#2DB4FF] ease-linear duration-300"
                          : "bg-gray-500"
                      }`}
                      key={index}
                    ></span>
                  ))}
                </div>
                {isSkillContentShow ? (
                  <p className="text-sm lg:text-base font-bold text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {skillsName(
                      `baseSetting.skills.${skillName}.content.${skillContentIndex}`
                    )}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default SkillLevel;
