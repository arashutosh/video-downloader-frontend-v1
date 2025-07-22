import React, { useState } from 'react';
import { Download, FileVideo, FileAudio, Loader, CheckCircle } from 'lucide-react';

interface Format {
  id: string;
  type: 'video' | 'audio';
  quality: string;
  format: string;
  size: string;
  extension: string;
}

interface FormatSelectorProps {
  formats: Format[];
  onDownload: (formatId: string) => void;
  downloadingId: string | null;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  formats,
  onDownload,
  downloadingId
}) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'audio'>('all');

  const filteredFormats = formats.filter(format => 
    filter === 'all' || format.type === filter
  );

  const getQualityColor = (quality: string) => {
    if (quality.includes('1080p') || quality.includes('4K')) return 'text-purple-600 bg-purple-100';
    if (quality.includes('720p')) return 'text-blue-600 bg-blue-100';
    if (quality.includes('480p')) return 'text-green-600 bg-green-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Available Formats</h3>
        
        <div className="flex gap-2">
          {(['all', 'video', 'audio'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filteredFormats.map((format) => (
          <div
            key={format.id}
            className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {format.type === 'video' ? (
                    <FileVideo className="w-5 h-5 text-blue-600" />
                  ) : (
                    <FileAudio className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">
                      {format.format}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(format.quality)}`}>
                      {format.quality}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {format.extension.toUpperCase()} • {format.size}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDownload(format.id)}
                disabled={downloadingId === format.id}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {downloadingId === format.id ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFormats.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No {filter !== 'all' ? filter : ''} formats available
        </div>
      )}
    </div>
  );
};