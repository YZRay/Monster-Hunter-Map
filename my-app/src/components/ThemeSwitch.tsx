import { useEffect, useState } from "react";
import { Button, Switch } from "@nextui-org/react";
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
    <Switch
      defaultSelected={resolvedTheme === "dark"}
      onChange={handleThemeChange}
      size="lg"
      color="default"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <IoMdMoon className={className} />
        ) : (
          <IoMdSunny className={className} />
        )
      }
    ></Switch>
  );
}
