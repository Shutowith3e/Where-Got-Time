import useAuth from "@/context/AuthContext";
import supabase from "@/helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  return (
    <nav className="grid grid-cols-2 items-center px-8 py-4 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Link to={authenticated ? "/mainUser" : "/"}>
          <img src="/logo.png" className="max-h-10"></img>
        </Link>
      </div>

      <div className="flex justify-end items-center gap-8 flex-row">
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
            <button
              onClick={signOut}
              className="text-indigo-800 bg-indigo-300 rounded-3xl px-4 py-2 hover:underline font-semibold"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="text-indigo-800 hover:underline">
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-indigo-800 bg-indigo-300 rounded-3xl px-4 py-2 hover:underline font-semibold"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
