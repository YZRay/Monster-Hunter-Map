import { FC } from "react";
import Image from "next/image";

const ArmorSection: FC<ArmorSectionProps> = ({ armor }) => {
  const equipKey = armor?.equipKey;

  return (
    <div className="max-w-6xl mx-auto flex flex-col sticky top-0 z-50 bg-white">
      <h1 className="text-2xl font-bold mt-8">Title</h1>
      <div className="grid grid-cols-3 gap-2 my-8">
        <div className="flex flex-col items-center max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="pt-4">
            <Image
              src="/assets/icons/weapon.png"
              width={50}
              height={50}
              alt="weapon"
            ></Image>
          </div>
          <p></p>
        </div>
        <div className="flex flex-col items-center  max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="pt-4">
            <Image
              src="/assets/icons/helm.png"
              width={50}
              height={50}
              alt="helm"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col items-center  max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2">
            <Image
              src="/assets/icons/mail.png"
              width={50}
              height={50}
              alt="mail"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col items-center  max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2">
            <Image
              src="/assets/icons/gloves.png"
              width={50}
              height={50}
              alt="gloves"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col items-center  max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2">
            <Image
              src="/assets/icons/belt.png"
              width={50}
              height={50}
              alt="belt"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col items-center  max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2">
            <Image
              src="/assets/icons/greaves.png"
              width={50}
              height={50}
              alt="greaves"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmorSection;
