import supabase from "@/helper/supabaseClient";
import type { PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Wrapper({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const jwt = session?.access_token;
      if (jwt) {
        const response = await fetch("http://localhost:8000/groups/groupName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        const result = await response.json();
        console.log(result);
      } else {
        console.error("No session found, user not authenticated.");
      }
      setAuthenticated(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  } else {
    // if ur authenticated u get to go to the children components else u will redirected to login
    return authenticated ? <>{children}</> : <Navigate to="/login" />;
  }
}
