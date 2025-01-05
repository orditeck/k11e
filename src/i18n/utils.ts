import { backend } from "./backend";
import { routes } from "./routes";
import { ui } from "./ui";
import { defaultLang, type Language } from "./const";

type UiKeys = keyof (typeof ui)[typeof defaultLang];
type BackendKeys = keyof (typeof backend)[typeof defaultLang];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: UiKeys | BackendKeys) {
    if (key in ui[lang]) {
      return ui[lang][key as UiKeys];
    }
    if (key in backend[lang]) {
      return backend[lang][key as BackendKeys];
    }
    if (key in ui[defaultLang]) {
      return ui[defaultLang][key as UiKeys];
    }
    if (key in backend[defaultLang]) {
      return backend[defaultLang][key as BackendKeys];
    }
    return key; // Fallback to returning the key itself if not found
  };
}

export function useTranslatedPath(lang: Language) {
  return function translatePath(path: string, l: Language = lang) {
    const pathName = path;
    const hasTranslation =
      defaultLang !== l &&
      routes[l] !== undefined &&
      routes[l][pathName] !== undefined;
    const translatedPath = hasTranslation
      ? "/" + routes[l]![pathName]
      : `/${path}`;

    return l === defaultLang ? translatedPath : `/${l}${translatedPath}`;
  };
}

export function getOriginalRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const currentLang = getLangFromUrl(url);

  const path = pathname.replace(/^\/+/, "").replace(`${currentLang}/`, "");

  if (defaultLang === currentLang || path === undefined) {
    return path;
  }

  const getKeyByValue = (
    obj: Record<string, string>,
    value: string,
  ): string | undefined => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}
