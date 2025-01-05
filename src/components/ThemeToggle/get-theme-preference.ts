export const getThemePreference = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("color-theme")) {
    return localStorage.getItem("color-theme") || "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
