import { useState } from "react";
import { getThemePreference } from "./get-theme-preference";

import "@fontsource/noto-emoji";
import classNames from "classnames";

export default function ModeToggle() {
  let theme = getThemePreference();
  const [localTheme, setLocalTheme] = useState(theme);

  if (typeof localStorage !== "undefined") {
    const observer = new MutationObserver(() => {
      theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      localStorage.setItem("color-theme", theme);
      setLocalTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  const toggle = () => {
    const newTheme = localTheme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(localTheme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button
      onClick={toggle}
      className={classNames([
        "font-['Noto_Emoji']",
        "cursor-pointer",
        "py-2",
        "px-3",
        "text-sm",
        "text-gray-500",
        "rounded-lg",
        "hover:bg-blue-100",
        "hover:text-blue-700",
        "dark:text-gray-400",
        "dark:hover:bg-gray-700",
      ])}
    >
      {localTheme === "dark" ? "🌞" : "🌚"}
    </button>
  );
}
