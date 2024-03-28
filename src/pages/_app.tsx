import { AppProps } from "next/app";
import { initializePrisma } from "../../prisma";
import { SessionProvider } from "next-auth/react";
import React from "react";

initializePrisma();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
