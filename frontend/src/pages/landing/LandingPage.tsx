import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow space-y-12">
          <h1 className="text-4xl font-extrabold text-center mt-6">
            Effortless Group Scheduling For Everyone
          </h1>
          <h2 className="text-center mt-6 font-stretch-75% text-2xl text-slate-800">
            Say goodbye to scheduling chaos. Combine calendars, detect clashes,
            and <br />
            stay synced with your groups — whether for lessons, CCAs, or project
            meetings.
          </h2>
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
