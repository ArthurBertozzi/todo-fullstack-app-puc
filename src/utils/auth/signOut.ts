import { signOut } from "next-auth/react";
import Router from "next/router";

export const signOutUser = async () => {
  await signOut({ redirect: false, callbackUrl: "/" });
  Router.push("/");
};
