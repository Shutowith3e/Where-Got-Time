import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function ContributePage() {
  return (
    <div className="w-full flex justify-center items-center min-h-dvh bg-gradient-to-b from-orange-900/60 px-4">
      <div className="bg-purple-100 rounded-xl shadow-lg w-full max-w-md p-8 text-center relative">
        <Link to="/" aria-label="Back to home">
          <button
            className="absolute top-3 right-3 text-gray-700 text-xl font-bold rounded-full w-6 h-6 cursor-pointer"
            title="Close"
          >
            X
          </button>
        </Link>

        <div className="flex items-center justify-center mb-4">
          <img
            src="/logo.png"
            alt="Where Got Time Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-2 p-2">
          Contribute To Where Got Time
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          Help us improve on Where Got Time. Submit a pull request, report bugs,
          or star the repo on GitHub!
        </p>
        <a
          href="https://github.com/Shutowith3e/Where-Got-Time"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-black text-white text-sm font-medium rounded-lg transition"
        >
          <FaGithub className="text-white text-lg" />
          View GitHub Repository
        </a>
      </div>
    </div>
  );
}
