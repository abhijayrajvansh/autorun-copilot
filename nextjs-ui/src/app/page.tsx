

'use client';

import { useState, useEffect } from 'react';

// Declare the electronAPI types
declare global {
  interface Window {
    electronAPI: {
      startAutomation: () => Promise<{success: boolean, message: string}>;
      stopAutomation: () => Promise<{success: boolean, message: string}>;
      getAutomationStatus: () => Promise<{isRunning: boolean}>;
    }
  }
}

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if we're running in Electron
    setIsElectron(typeof window !== 'undefined' && 'electronAPI' in window);
    
    // Get initial status
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.getAutomationStatus().then(status => {
        setIsRunning(status.isRunning);
      }).catch(console.error);
    }
  }, []);

  const handleStart = async () => {
    if (!window.electronAPI) {
      setMessage('Electron API not available');
      return;
    }

    try {
      const result = await window.electronAPI.startAutomation();
      setMessage(result.message);
      if (result.success) {
        setIsRunning(true);
      }
    } catch (error) {
      setMessage('Error starting automation');
      console.error(error);
    }
  };

  const handleStop = async () => {
    if (!window.electronAPI) {
      setMessage('Electron API not available');
      return;
    }

    try {
      const result = await window.electronAPI.stopAutomation();
      setMessage(result.message);
      if (result.success) {
        setIsRunning(false);
      }
    } catch (error) {
      setMessage('Error stopping automation');
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Key Automation</h1>
          <p className="text-gray-600 text-sm">Press Cmd + Enter every 3 seconds</p>
        </div>

        <div className="space-y-4">
          {/* Status indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={`text-sm font-medium ${isRunning ? 'text-green-600' : 'text-gray-500'}`}>
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleStart}
              disabled={isRunning || !isElectron}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                isRunning || !isElectron
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              Start Automation
            </button>

            <button
              onClick={handleStop}
              disabled={!isRunning || !isElectron}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                !isRunning || !isElectron
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              Stop Automation
            </button>
          </div>

          {/* Message display */}
          {message && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 text-center">{message}</p>
            </div>
          )}

          {/* Help text */}
          {!isElectron && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700 text-center">
                Run this app through Electron to enable automation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
