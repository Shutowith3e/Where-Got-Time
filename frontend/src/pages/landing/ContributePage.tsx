import { Link } from "react-router-dom";

export default function ContributePage() {
  return (
    <div className="w-full shadow-none border-none flex justify-center items-center min-h-dvh flex-col bg-gradient-to-b from-orange-900/60">
      <div className="bg-purple-100 rounded-xl shadow-lg w-full max-w-md p-10 text-center relative">
        <Link to="/" aria-label="Back to home">
          <button
            className="absolute top-3 right-3 text-gray-700 text-xl font-bold rounded-full w-6 h-6 hover:bg-orange-400 cursor-pointer"
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

        <h2 className="text-2xl font-semibold mb-6 text-purple-900">
          Buy Me A Cup Of Coffee
        </h2>

        {/* to add on the actual Ko-fi link */}
        <a href="https://ko-fi.com/">
          <div className="bg-orange-200 text-rose-800 rounded-lg py-6 px-4 text-7xl font-semibold mx-auto shadow-md hover:bg-orange-300 transition">
            <img
              src="/fullLogoKofi.png"
              alt="Ko-fi Logo"
              className="max-h-16 w-auto object-contain mx-auto"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
