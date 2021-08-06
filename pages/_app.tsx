import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}
export default MyApp;
