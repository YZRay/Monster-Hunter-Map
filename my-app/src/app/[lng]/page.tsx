import HomePage from "@/app/[lng]/home/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {

  return (
    <main>
      <ToastContainer />
      <HomePage />
    </main>
  );
}
