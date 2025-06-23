
import React from 'react';
import { Loader2, Zap } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white dark:border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              {/* <Zap className="h-12 w-12 text-emerald-400 animate-pulse" /> */}
              <Loader2 className="h-8 w-8 animate-spin text-emerald-300 absolute -top-2 -right-2" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2">Loading Leagues</h3>
          <p className="text-black dark:text-gray-400">Discovering sports leagues from around the world...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
