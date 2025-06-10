import supabase from "@/helper/supabaseClient";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type AuthContextType = {
  authenticated: boolean;
  isAuthenicating: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(false);
    };
    getSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        isAuthenicating: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
export default useAuth;
