import supabase from "@/helper/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ProtectedNavBar() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };
  return (
    <div className="flex justify-end">
      <button
        onClick={signOut}
        className="text-indigo-800 bg-indigo-300 rounded-3xl px-4 py-2 hover:underline font-semibold"
      >
        Log Out
      </button>
    </div>
  );
}
