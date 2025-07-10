import supabase from "@/helper/supabaseClient";
import axiosInstance from "@/lib/axios-instance";
import { AuthError } from "@supabase/supabase-js";
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
  loginError: AuthError | null;
  signOutError: AuthError | null;
  userEmail: string;
  /**
   * Logs in the user
   * @param email
   * @param password
   * @returns True if login was successful
   */
  login: (email: string, password: string) => Promise<boolean>;
  personalGroupId: string;
  signOut: () => Promise<boolean>;
};

async function getPersonalGroup() {
  const {
    data: { data },
  } = await axiosInstance.post("/users/getUserPersonalGroup");
  return data;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<AuthError | null>(null);
  const [signOutError, setSignOutError] = useState<AuthError | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [personalGroupId, setPersonalGroupId] = useState("");

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    setLoginError(error);
    setAuthenticated(!error);
    const personalGid = await getPersonalGroup();
    setPersonalGroupId(personalGid);

    return !error;
  };

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session?.access_token);
      setUserEmail(session?.user?.email ?? "");
      if (session) {
        const personalGid = await getPersonalGroup();
        setPersonalGroupId(personalGid);
      }

      // test
      // const personalgroupid = await personalGroup();
      // console.log(personalgroupid);
      // const jwt = session?.access_token;
      // if (jwt) {
      //   const response = await fetch("http://localhost:8000/users/getGroups", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${jwt}`,
      //     },
      //   });

      //   const result = await response.json();
      //   console.log(result);
      // } else {
      //   console.error("No session found, user not authenticated.");
      // }
      setAuthenticated(!!session);
      setIsLoading(false);
    };
    getSession();
  }, []);

  const signOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setSignOutError(error);
    setIsLoading(false);
    if (!error) {
      setAuthenticated(false);
    }
    return !error;
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        isAuthenicating: isLoading,
        loginError,
        login,
        signOutError,
        signOut,
        userEmail,
        personalGroupId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
export default useAuth;
