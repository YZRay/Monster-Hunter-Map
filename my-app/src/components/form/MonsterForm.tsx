import { useForm, Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import monster from "../../data/data.json";
import city from "../../data/taiwanCity.json";

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MonsterForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({
    defaultValues: {
      name: "火龍",
      level: 1,
      location: "縣市",
      coordinates: "",
      desc: "地點描述",
    },
  });

  //送出表單
  const onSubmit = handleSubmit((data) => {
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
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log("Form data submit successfully", data);
        setSubmitted(true);
        reset(); // 送出後清空表單
      })
      .catch((error) => {
        console.error("Error submit data", error);
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
      <h1 className="text-2xl font-bold mb-2 text-gray-800">分享魔物資訊</h1>
      <form
        onSubmit={onSubmit}
        className="bg-slate-200 px-8 py-4 rounded-md mb-12"
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Listbox {...field}>
              <div className="relative mt-1">
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                  <h1 className="text-xl font-bold mt-2">魔物名稱</h1>
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
                    {monsterNames.map((name) => (
                      <Listbox.Option key={name} value={name}>
                        {({ active }) => (
                          <div
                            className={`relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
                              active
                                ? "bg-slate-800 text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {name}
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
          type="textarea"
          {...register("coordinates")}
          className="w-full bg-slate-50 rounded-lg py-2 px-3 shadow-md max-h-40"
          required
          placeholder="25.015, 121.483"
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Listbox {...field}>
              <div className="relative mt-1">
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                  <h1 className="text-xl font-bold mt-2">縣市</h1>
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
                    {city.map((name) => (
                      <Listbox.Option key={name.id} value={name.name}>
                        {({ active }) => (
                          <div
                            className={`relative cursor-[url('/assets/icons/mh_hand.svg'),_pointer] rounded-md select-none py-2 pl-8 pr-4 ${
                              active
                                ? "bg-slate-800 text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {name.name}
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

        <label className="text-xl font-bold mt-2 block">地點描述</label>
        <input
          type="textarea"
          {...register("desc")}
          className="w-full bg-slate-50 rounded-lg py-2 px-3 shadow-md max-h-40"
        />
        <button
          type="submit"
          className="w-full justify-center rounded-md cursor-[url('/assets/icons/mh_hand.svg'),_pointer] bg-slate-400 py-2 text-white font-bold hover:bg-slate-800 duration-300 my-4"
        >
          送出 {submitted && <p>表单已成功提交</p>}
        </button>
      </form>
    </Fragment>
  );
};

export default MonsterForm;
