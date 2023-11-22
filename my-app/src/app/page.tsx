import HomePage from "@/pages/home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Page() {
  return (
    <main>
      <ToastContainer />
      <HomePage />
    </main>
  );
}
