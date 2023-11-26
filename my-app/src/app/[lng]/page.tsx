import HomePage from "@/app/[lng]/home/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "../i18n/index";
import { useRouter } from "next/router";
export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "data");

  return (
    <main>
      <ToastContainer />
      <HomePage />
    </main>
  );
}
