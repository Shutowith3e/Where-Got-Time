import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="grid grid-cols-2 items-center px-8 py-4 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="max-h-10"></img>
      </div>

      <div className="flex justify-end items-center gap-6 ">
        <Link to="/signup" className="text-indigo-800 hover:underline">
          Sign Up
        </Link>
        <Link
          to="/login"
          className="text-indigo-800 bg-indigo-300 rounded-3xl px-4 py-2 hover:underline font-semibold"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
}
