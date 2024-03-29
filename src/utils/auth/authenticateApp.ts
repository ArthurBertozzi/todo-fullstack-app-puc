import { signIn } from "next-auth/react";
import Router from "next/router";

export const authenticateApp = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!result) {
    console.error("Erro ao fazer login");
    return false;
  }

  if (result.error) {
    console.error("Erro ao fazer login:", result.error);
    return false;
  } else {
    console.log("Login bem-sucedido:", result);
    Router.push("/loggedTest");
    return true;
  }
};
