import { fallbackLng } from "../app/i18n/settings";

const urlBuilder = (lng: string, url: string) => {
  // 在這裡構建 URL
  if(lng === fallbackLng)
    return url;
  
  return `/${lng}/${url}`;
};
export default urlBuilder;
