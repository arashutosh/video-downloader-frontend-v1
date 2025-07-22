import React from 'react';
import { Download } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
          <Download className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          YTDownloader
        </h1>
      </div>
      <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
        Download YouTube videos instantly in any format you prefer. 
        Fast, free, and easy to use.
      </p>
    </header>
  );
};