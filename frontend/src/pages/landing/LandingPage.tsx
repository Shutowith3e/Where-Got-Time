import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow space-y-8">
          <h1 className="text-2xl font-bold text-center mt-6">
            Welcome to Where Got Time
          </h1>
          <div className="flex flex-row justify-center space-x-10">
            <Link to="/signup" className="text-indigo-800">
              <button className="bg-indigo-100 rounded-3xl px-4 py-2 hover:underline font-semibold">
                Get Started!
              </button>
            </Link>

            <Link to="/contribute" className="text-indigo-100">
              <button className="bg-indigo-800 rounded-3xl px-4 py-2 hover:underline font-semibold">
                Contribute
              </button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
