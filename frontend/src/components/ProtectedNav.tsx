import supabase from "@/helper/supabaseClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProtectedNavBar() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  return (
    <nav className="grid grid-cols-2 items-center px-8 py-4 bg-white">
      <div className="flex items-center gap-3">
        <Link to="/mainUser">
          <img src="/logo.png" className="max-h-10"></img>
        </Link>
      </div>

      <div className="flex flex-row gap-10 justify-end items-center">
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
      </div>
    </nav>
  );
}
