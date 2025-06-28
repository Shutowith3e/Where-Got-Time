// components/ContributeCard.tsx
import React from 'react';
import { Link } from "react-router-dom";

const ContributeCard: React.FC = () => {
  return (
    <div className="w-full shadow-none border-none flex justify-center items-center min-h-dvh flex-col bg-gradient-to-b from-orange-900/60 ">
      <div className="bg-purple-100 rounded-xl shadow-lg w-full max-w-md p-15 text-center relative">
        {/* Close Button */}

        <Link to="/">
        <button className="absolute top-3 right-3 text-gray-700 text-xl font-bold rounded-full w-6 h-6 hover:bg-gray-400">
        X
        </button>
        </Link>

        {/* Toggle and Label */}
        <div className="flex items-center justify-center mb-4">
          <img
            src="/logo.png" 
            alt="Where Got Time Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6">
          Buy Me A Cup Of Coffee
        </h2>

        {/* Kofi link placeholder */}
        <div className="bg-orange-200 text-rose-800 rounded-lg py-6 px-4 text-7xl font-semibold mx-auto shadow-md">
          <img
            src="/fullLogoKofi.png" 
            alt="Where Got Time Logo"
            className="max-h-15 w-auto object-contain mx-auto"
          />
        </div>

        {/* GitHub Contribution */}
        <p className="mt-8 text-xl text-purple-800 font-semibold">
          Contribute To GitHub
        </p>
      </div>
    </div>
  );
};

export default ContributeCard;
