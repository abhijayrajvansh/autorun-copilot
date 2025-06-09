"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // Load count from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem("menubar-counter");
    if (savedCount !== null) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("menubar-counter", count.toString());
  }, [count]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-xs">
        {/* Counter Display */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
            Counter
          </h1>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            {count}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center items-center space-x-3">
          {/* Decrement Button */}
          <button
            onClick={decrement}
            className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Decrease counter"
          >
            <Minus size={20} />
          </button>

          {/* Reset Button */}
          <button
            onClick={reset}
            className="flex items-center justify-center w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Reset counter"
          >
            <RotateCcw size={18} />
          </button>

          {/* Increment Button */}
          <button
            onClick={increment}
            className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Increase counter"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
          macOS Menubar Counter
        </div>
      </div>
    </div>
  );
}
