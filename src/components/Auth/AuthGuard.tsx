import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { LoadingPage } from "../Utils/LoadingPage";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (!session) {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    router.push("/");
    return null; // Retorne null para interromper a renderização
  }

  // Se o usuário estiver autenticado, renderize o conteúdo da página
  return <>{children}</>;
};

export default AuthGuard;
