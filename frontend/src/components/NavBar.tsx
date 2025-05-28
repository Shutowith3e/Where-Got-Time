import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="grid grid-cols-12 p-4 bg-white">
        <div className="col-start-1 col-end-3">
          <img src="../../public/logo.png" className="max-h-10"></img>
        </div>

        <div className="col-start-10 col-end-12 space-x-12 justify-end">
          <Link to="/signup" className="text-indigo-800">
            Sign Up
          </Link>
          <Link to="/login" className="text-indigo-800">
            <button className="bg-indigo-300 rounded-3xl px-4 py-2">
              Log In
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
