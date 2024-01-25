import { useEffect, useState } from "preact/hooks";

export default function Theme() {
  const darkMedia = "(prefers-color-scheme: dark)";

  const setDark = () => {
    document.documentElement.classList.add("dark");

    console.log("setting dark theme");
  };

  const setLight = () => {
    document.documentElement.classList.remove("dark");

    console.log("setting light theme");
  };

  useEffect(() => {
    const isDarkTheme = !("theme" in localStorage) &&
      matchMedia(darkMedia).matches;

    if (localStorage.theme === "dark" || isDarkTheme) {
      setDark();
    } else {
      setLight();
    }

    matchMedia(darkMedia).addEventListener("change", ({ matches }) => {
      if (matches) {
        setDark();
      } else {
        setLight();
      }
    });
  }, []);

  return <></>;
}
