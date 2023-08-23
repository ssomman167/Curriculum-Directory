import ThemeStateProvider from "@/context/themeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeStateProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeStateProvider>
  );
}
