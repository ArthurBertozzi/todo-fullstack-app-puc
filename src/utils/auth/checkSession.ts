import { getSession } from "next-auth/react";
import Router from "next/router";

export const CheckSession = async () => {
  const session = await getSession();
  if (session) {
    Router.push("/loggedTest");
    return true;
  }
  return false;
};
