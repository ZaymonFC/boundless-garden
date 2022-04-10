import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Head from "next/head";
import "../styles/fonts.css";
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          async
          defer
          data-website-id="90253757-e427-4fb9-95f2-682c5f54e17c"
          src="https://fuck-google-analytics.herokuapp.com/umami.js"
        />
      </Head>
      <AnimatePresence exitBeforeEnter initial={false}>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </AnimatePresence>
    </>
  );
}
export default MyApp;
