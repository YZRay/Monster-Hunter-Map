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
        onClick={handleThemeChange}
        variant="shadow"
        className="text-slate-200"
        isIconOnly
        color={resolvedTheme === "dark" ? "warning" : "primary"}
      >
        {resolvedTheme === "dark" ? (
          <IoMdSunny className="w-5 h-5" />
        ) : (
          <IoMdMoon className="w-5 h-5" />
        )}
      </Button>
    </>
  );
}
