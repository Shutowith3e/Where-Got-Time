import useAuth from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const { signOutError, signOut } = useAuth();

  const onSignOut = async () => {
    navigate("/");
    await signOut();
  };

  return (
    <nav className="grid grid-cols-2 items-center p-1.5 md:px-8 md:py-4 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Link to={authenticated ? "/mainUser" : "/"}>
          <img src="/logo.png" className="md:max-h-10 max-h-4"></img>
        </Link>
      </div>

      <div className="flex justify-end items-center gap-2 md:gap-6 flex-row whitespace-nowrap md:text-base text-[8px]">
        {authenticated ? (
          <>
            <Link to="/mainUser" className="text-indigo-800 hover:underline">
              Schedule
            </Link>
            <Link to="/mainGroup" className="text-indigo-800 hover:underline">
              Groups
            </Link>
            <Link to="/createGroup" className="text-indigo-800 hover:underline">
              Create Group
            </Link>
            <Link to="/help" className="text-indigo-800 hover:underline">
              Help
            </Link>
            <div className="flex flex-col">
              <button
                onClick={onSignOut}
                className="text-indigo-800 bg-indigo-300 rounded-3xl px-4 py-2 hover:underline font-semibold cursor-pointer"
              >
                Log Out
              </button>
              {signOutError && (
                <p className="text-sm text-red-500">{signOutError.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/signup" className="text-indigo-800 hover:underline">
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-indigo-800 bg-indigo-300 rounded-3xl px-4 py-2 hover:underline font-semibold cursor-pointer"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
