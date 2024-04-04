import { AppProps } from "next/app";
import { initializePrisma } from "../../prisma";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ThemeProvider } from "../components/Theme/theme-provider";

initializePrisma();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
