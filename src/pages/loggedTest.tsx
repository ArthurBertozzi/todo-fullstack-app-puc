import React, { useEffect } from "react";
import AuthGuard from "../components/Auth/AuthGuard";
import { getSession, useSession } from "next-auth/react";
import { decode } from "next-auth/jwt";
import CreateTask from "../components/Task/createTask";

const LoggedTest = () => {
  const session = useSession();

  return (
    <div>
      <AuthGuard>
        loggedTest
        <p>{session?.data?.user?.email}</p>
        <CreateTask />
      </AuthGuard>
    </div>
  );
};

export default LoggedTest;
