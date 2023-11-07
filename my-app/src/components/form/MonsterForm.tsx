import { useForm, Controller, Form } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import GeolocationBtn from "../api/GeolocationBtn";
import Image from "next/image";
import monster from "../../data/data.json";
import { ToastContainer, toast } from "react-toastify";

const levels = [5, 6, 7, 8, 9, 10];
const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MonsterForm = () => {
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
    if (disableSubmit) {
      return; // 如果被禁用就直接回傳，不往下執行
    }
    data.name = monsterNameData;
    data.coordinates = manualInput;

    setDisableSubmit(true);

    fetch("https://api.mhnow.cc/api/monsterlocation/create", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
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
        if (!data.success) {
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
  const monsterNames = Object.values(monster.equipSetting)
    .filter(
      (armor) =>
        !armor.name.includes("皮製") &&
        !armor.name.includes("礦石") &&
        armor.mapShow
    )
    .map((armor) => armor.name);

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
              <h1 className="text-xl font-bold mt-2">魔物名稱</h1>
              <div className="bg-white p-2 rounded-md shadow-md flex flex-wrap gap-y-4 gap-x-2 justify-center">
                {monsterNames.map((name, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox_${name}`}
                      {...field}
                      value={name}
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
                      htmlFor={`checkbox_${name}`}
                      className="text-sm md:text-base text-gray-800"
                    >
                      <Image
                        className="cursor-[url('/assets/icons/mh_hand.svg'),_pointer] h-8 w-8 md:w-12 md:h-12"
                        src={`/assets/icons/Monster/${name}.svg`}
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
                    <h1 className="text-xl font-bold mt-2">魔物等級</h1>
                  </Listbox.Label>
                  <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
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
                              className={`relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
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
                    <h1 className="text-xl font-bold mt-2">周目</h1>
                  </Listbox.Label>
                  <Listbox.Button className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer]">
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
                              className={`relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
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
        <label className="text-xl font-bold mt-2 block">經緯度</label>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <input
            type="text"
            {...register("coordinates")}
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="w-full bg-slate-50 rounded-lg py-2 px-3 shadow-md max-h-40"
            required
            placeholder="請輸入經緯度"
          />
          <GeolocationBtn
            onGeolocationData={(data) =>
              setManualInput(`${data.latitude}, ${data.longitude}`)
            }
          />
        </div>
        <button
          type="submit"
          disabled={disableSubmit || selectedMonster.length === 0} // 禁止上傳
          className={`w-full flex items-center justify-center gap-2 rounded-md py-2 font-bold my-4 ${
            disableSubmit || selectedMonster.length === 0
              ? "bg-gray-300 text-gray-500 cursor-[url('/assets/icons/mh_cursor.svg'),_auto]" // 禁止上傳
              : "bg-slate-400 text-white hover:bg-slate-800 duration-300 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]" // 可以送出時
          }`}
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          <span>送出表單</span>
        </button>
      </form>
    </Fragment>
  );
};

export default MonsterForm;
