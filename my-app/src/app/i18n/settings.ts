export const fallbackLng = "zh-Hant-TW";
export const languages = [fallbackLng, "en", "ja"];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns = defaultNS as string | string[]
) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
