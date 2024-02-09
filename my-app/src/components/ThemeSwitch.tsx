import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;
  return (
    <>
      <Button
        className={`w-10 h-10 border ${
          resolvedTheme === "light" ? "border-slate-700" : "border-slate-400"
        }`}
        onClick={handleThemeChange}
        variant="bordered"
        color={resolvedTheme === "dark" ? "warning" : "primary"}
      >
        {resolvedTheme === "dark" ? (
          <IoMdSunny className="w-5 h-50" />
        ) : (
          <IoMdMoon className="w-5 h-5" />
        )}
      </Button>
    </>
  );
}
