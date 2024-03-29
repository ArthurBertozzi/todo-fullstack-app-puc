import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export const CheckSession = async () => {
  const session = useSession();
  if (session.data) {
    Router.push("/loggedTest");
    return true;
  }
  return false;
};
