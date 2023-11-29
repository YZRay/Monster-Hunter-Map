import React, { FC, Fragment } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

interface MyComponentProps<T> {
  data: T;
}

interface statusEffect {
  poison: number;
  sleep: number;
  paralysis: number;
  blastblight: number;
  stun: number;
}
const MonsterStatusEffect: FC<MyComponentProps<any>> = ({ data }) => {
  const statusEffects = data.statusEffect;
  const weaknessElement = data.weaknessElement;
  const { t } = useTranslation("monster");
  const renderStatusEffectRow = (effectName: string, effectCount: number) => (
    <tr key={effectName} className="bg-gray-800">
      <td>
        <Image
          src={`/assets/icons/Elements/${effectName}.svg`}
          width={40}
          height={40}
          loading="lazy"
          alt={effectName}
          className="mx-auto"
        />
      </td>
      <td>
        <div className="flex items-center gap-1 justify-center">
          {effectCount === 0 ? (
            <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          ) : (
            Array.from({ length: effectCount }, (_, index) => (
              <StarIcon
                key={index}
                className="h-5 w-5 text-yellow-500"
                aria-hidden="true"
              />
            ))
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <Fragment>
      <div className="flex items-center">
        <StarIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
        <p className="text-center text-md font-bold text-gray-800">
          的數量越多，對魔物越有效
        </p>
      </div>
      <div className="flex">
        <table className="monster-table">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th>{t("MonsterMap.status")}</th>
              <th>{t("MonsterMap.effectiveness")}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(statusEffects).map(([effectName, effectCount]) =>
              renderStatusEffectRow(effectName, effectCount as number)
            )}
          </tbody>
        </table>
        <table className="monster-table">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th>{t("MonsterMap.element")}</th>
              <th>{t("MonsterMap.effectiveness")}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(weaknessElement).map(
              ([weaknessName, weaknessCount]) =>
                renderStatusEffectRow(weaknessName, weaknessCount as number)
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default MonsterStatusEffect;
