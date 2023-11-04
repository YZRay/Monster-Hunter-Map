import { useForm, Controller, Form } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import Image from "next/image";
import monster from "../../data/data.json";
import city from "../../data/taiwanCity.json";

const levels = [5, 6, 7, 8, 9, 10];

const MonsterForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<string[]>([]);
  const monsterNameData = selectedMonster.join(",");

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
      level: 5,
      coordinates: "",
    },
  });

  //送出表單
  const onSubmit = handleSubmit((data) => {
    if (disableSubmit) {
      return; // 如果被禁用就直接回傳，不往下執行
    }
    data.name = monsterNameData;
    setDisableSubmit(true);

    console.log(data);

    fetch("https://api.mhnow.cc/api/monsterlocation", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        console.log("Form submit successfully", data);
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
      (armor) => !armor.name.includes("皮製") && !armor.name.includes("礦石")
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
              <div className="bg-white p-2 rounded-md shadow-md flex flex-wrap gap-4">
                {monsterNames.map((name, index) => (
                  <div className="flex gap-1 items-center" key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox_${name}`}
                      {...field}
                      value={name}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-600"
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
        <label className="text-xl font-bold mt-2 block">經緯度</label>
        <input
          type="text"
          {...register("coordinates")}
          className="w-full bg-slate-50 rounded-lg py-2 px-3 shadow-md max-h-40"
          required
          placeholder="請輸入經緯度"
        />
        <button
          type="submit"
          disabled={disableSubmit || selectedMonster.length === 0} // 禁止上傳
          className={`w-full justify-center rounded-md py-2 font-bold my-4 ${
            disableSubmit || selectedMonster.length === 0
              ? "bg-gray-300 text-gray-500 cursor-[url('/assets/icons/mh_cursor.svg'),_auto]" // 禁止上傳
              : "bg-slate-400 text-white hover:bg-slate-800 duration-300 cursor-[url('/assets/icons/mh_hand.svg'),_pointer]" // 可以送出時
          }`}
        >
          {disableSubmit ? "已成功上傳" : "送出表單"}
        </button>
      </form>
    </Fragment>
  );
};

export default MonsterForm;
