import React from 'react';
import { AlertTriangle, Mail, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Important Notice</h4>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              This tool is intended for personal use only. Please respect copyright laws 
              and YouTube's Terms of Service. Only download content you have permission 
              to download or that falls under fair use.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact & Support</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@ytdownloader.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Github className="w-4 h-4" />
                <span className="text-sm">Open Source Project</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2025 YTDownloader. Built with privacy and respect for content creators in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};