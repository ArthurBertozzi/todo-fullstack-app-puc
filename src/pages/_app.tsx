import { AppProps } from "next/app";
import { initializePrisma } from "../../prisma";
import React from "react";

initializePrisma();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
