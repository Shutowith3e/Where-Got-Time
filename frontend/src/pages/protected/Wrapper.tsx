import useAuth from "@/context/AuthContext";

import type { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

export default function Wrapper({ children }: PropsWithChildren) {
  const { authenticated, isAuthenicating } = useAuth();

  if (isAuthenicating) {
    return <div>loading...</div>;
  } else {
    // if ur authenticated u get to go to the children components else u will redirected to login
    return authenticated ? <>{children}</> : <Navigate to="/login" />;
  }
}
