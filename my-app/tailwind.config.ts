import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light-gradient":
          "linear-gradient(157deg, rgba(49, 158, 214, 0.4) 0%, rgba(3, 5, 50, 0.35) 65%)",
        "dark-gradient": "linear-gradient(157deg, #0f172a 0%, #111827 65%)",
      },
    },
  },
  plugins: [require("@nextui-org/react"), require("@headlessui/tailwindcss")],
  darkMode: "class",
};
export default config;
