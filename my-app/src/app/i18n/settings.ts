export const fallbackLng = "zhTW";
export const languages = [fallbackLng, "en", "jp"];
export const defaultNS = "common";

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
