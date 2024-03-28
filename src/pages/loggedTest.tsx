import React, { useEffect } from "react";
import AuthGuard from "../components/Auth/AuthGuard";
import { getSession, useSession } from "next-auth/react";
import { decode } from "next-auth/jwt";

const LoggedTest = () => {
  const session = useSession();

  return (
    <div>
      <AuthGuard>
        loggedTest
        <p>{session?.data?.user?.email}</p>
      </AuthGuard>
    </div>
  );
};

export default LoggedTest;
