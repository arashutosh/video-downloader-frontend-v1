import React from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { VideoInfo } from './components/VideoInfo';
import { FormatSelector } from './components/FormatSelector';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { useYouTubeDownloader } from './hooks/useYouTubeDownloader';

function App() {
  const {
    isLoading,
    videoData,
    formats,
    downloadingId,
    error,
    fetchVideoInfo,
    downloadFormat,
    reset
  } = useYouTubeDownloader();

  const handleNewSearch = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-4xl mx-auto space-y-8">
          {!videoData && !error && (
            <URLInput onSubmit={fetchVideoInfo} isLoading={isLoading} />
          )}

          {error && (
            <ErrorMessage message={error} onRetry={reset} />
          )}

          {videoData && (
            <>
              <VideoInfo {...videoData} videoId={videoData.videoId} url={videoData.url} />
              <FormatSelector
                formats={formats}
                onDownload={downloadFormat}
                downloadingId={downloadingId}
              />

              <div className="text-center">
                <button
                  onClick={handleNewSearch}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors backdrop-blur-sm"
                >
                  Download Another Video
                </button>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;