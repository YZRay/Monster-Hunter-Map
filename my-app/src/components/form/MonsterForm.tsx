import { useForm, Controller, Form } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import { FC } from "react";
import { Fragment, useState } from "react";
import GeolocationBtn from "../api/GeolocationBtn";
import Image from "next/image";
import monster from "../../data/data.json";
import { toast } from "react-toastify";
import useUserId from "@/components/Hook/UserId";
import { createMonsterLocation } from "../api/MLApi";
import { useTranslation } from "react-i18next";

const levels = [5, 6, 7, 8, 9, 10];
const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
  onSubmitted: (data: void) => void;
}

const MonsterForm: FC<Props> = ({ onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<string[]>([]);
  const [manualInput, setManualInput] = useState("");
  const monsterNameData = selectedMonster.join(",");
  const [geolocationData, setGeolocationData] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const { t } = useTranslation("monster");
  const { t: TransMonster } = useTranslation("data");

  const userId = useUserId();
  const isPrivateMode = userId.isPrivateMode;

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostData>({
    defaultValues: {
      name: "",
      level: 8,
      coordinates: "",
      round: 4,
    },
  });

  //送出表單
  const onSubmit = handleSubmit((data) => {
    if (isPrivateMode || disableSubmit) {
      toast.error("你使用的瀏覽器無法上傳資料", {
        position: "top-center",
        autoClose: 1000, // 1.5秒關閉
      });
      return; // 如果被禁用就直接回傳，不往下執行
    }
    data.name = monsterNameData;
    data.coordinates = manualInput;
    data.uid = userId.userId;
    console.log(data);

    setDisableSubmit(true);

    createMonsterLocation(data)
      .then((response) => {
        if (!response.ok) {
          toast.error("網路回應發生錯誤", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });
        }
        return response.json();
      })
      .then((data) => {
        if (!data.status) {
          toast.error("魔物資訊新增失敗！", {
            position: "top-center",
            className: "danger",
            autoClose: 1500, // 1.5秒關閉
          });
        } else {
          toast.success("魔物資訊新增成功！", {
            position: "top-center",
            autoClose: 1500, // 1.5秒關閉
          });

          onSubmitted();
        }
        setSubmitted(true);
        //reset(); // 送出後清空表單
      })
      .catch((error) => {
        console.error("Error submit Form", error);
      })
      .finally(() => {
        setDisableSubmit(false);
      });
  });

  // 魔物名稱
  const monsterNames = Object.entries(monster.equipSetting)
    .filter(
      ([key, armor]) =>
        !key.includes("leather") && !key.includes("alloy") && armor.mapShow
    )
    .map(([key, armor]) => ({ ...armor, key }));

  return (
    <Fragment>
      <form
        onSubmit={onSubmit}
        className="bg-slate-200 px-6 py-4 rounded-md my-4"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="relative mt-1">
              <h1 className="text-xl font-bold mt-2">
                {t("MonsterMap.monsterName")}
              </h1>
              <div className="bg-white p-2 rounded-md shadow-md flex flex-wrap gap-y-4 gap-x-2 justify-center">
                {monsterNames.map((name, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox_${name.name}`}
                      {...field}
                      value={name.key}
                      className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-lime-600 accent-lime-600"
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedMonster((prev) => {
                          if (prev.includes(value)) {
                            return prev.filter((item) => item !== value);
                          } else {
                            return [...prev, value];
                          }
                        });
                        setValue("name", monsterNameData);
                      }}
                    />
                    <label
                      htmlFor={`checkbox_${name.name}`}
                      className="text-sm md:text-base text-gray-800"
                    >
                      <Image
                        className=" h-8 w-8 md:w-12 md:h-12"
                        src={`/assets/icons/Monster/${name.name}.svg`}
                        width={50}
                        height={50}
                        alt="equipment"
                        loading="lazy"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <Controller
            name="level"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Listbox {...field}>
                <div className="relative mt-1">
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    <h1 className="text-xl font-bold mt-2">
                      {t("MonsterMap.level")}
                    </h1>
                  </Listbox.Label>
                  <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md ">
                    <span className="block truncate">{field.value}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 px-3 shadow-md max-h-40 overflow-y-auto">
                      {levels.map((level) => (
                        <Listbox.Option key={level} value={level}>
                          {({ active }) => (
                            <div
                              className={`relative  rounded-md select-none py-2 pl-8 pr-4 ${
                                active
                                  ? "bg-slate-800 text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {level}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
          />
          <Controller
            name="round"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Listbox {...field}>
                <div className="relative mt-1">
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    <h1 className="text-xl font-bold mt-2">
                      {t("MonsterMap.round")}
                    </h1>
                  </Listbox.Label>
                  <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md ">
                    <span className="block truncate">{field.value}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="bg-slate-50 mt-2 rounded-lg py-2 px-3 shadow-md max-h-40 overflow-y-auto">
                      {rounds.map((round) => (
                        <Listbox.Option key={round} value={round}>
                          {({ active }) => (
                            <div
                              className={`relative  rounded-md select-none py-2 pl-8 pr-4 ${
                                active
                                  ? "bg-slate-800 text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {round}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
          />
        </div>
        <label className="text-xl font-bold mt-2 block">
          {t("MonsterMap.Latitude")}
        </label>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <input
            type="text"
            {...register("coordinates")}
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="w-full bg-slate-50 rounded-lg py-2 px-3 shadow-md max-h-40"
            required
            placeholder={`${t("MonsterMap.LatitudePlaceholder")}`}
          />
          <GeolocationBtn
            onGeolocationData={(data) =>
              setManualInput(`${data.latitude}, ${data.longitude}`)
            }
          />
        </div>
        <button
          type="submit"
          disabled={
            disableSubmit ||
            selectedMonster.length === 0 ||
            selectedMonster.length > 2
          } // 禁止上傳
          className={`w-full flex items-center justify-center gap-2 rounded-md py-2 font-bold my-4 ${
            disableSubmit ||
            selectedMonster.length === 0 ||
            selectedMonster.length > 2
              ? "bg-gray-300 text-gray-500" // 禁止上傳
              : "bg-slate-400 text-white hover:bg-slate-800 duration-300 " // 可以送出時
          }`}
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          <span>{t("MonsterMap.submit")}</span>
        </button>
      </form>
    </Fragment>
  );
};

export default MonsterForm;
