import React, { useEffect, useState } from 'react';
import { Play, Clock, Eye } from 'lucide-react';

interface VideoInfoProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  channel: string;
  videoId?: string; // Add videoId prop for embedding
}

// Helper to extract videoId from a YouTube URL
function extractVideoId(url: string): string | null {
  const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export const VideoInfo: React.FC<VideoInfoProps & { url?: string }> = ({
  title,
  thumbnail,
  duration,
  views,
  channel,
  videoId,
  url
}) => {
  // Use videoId prop, or extract from url if available
  const id = videoId || (url ? extractVideoId(url) : null);
  const [liveViews, setLiveViews] = useState<string>(views);

  // Fetch live view count from YouTube Data API every 10 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function fetchLiveViews() {
      if (!id) return;
      try {
        // Replace YOUR_API_KEY with a real YouTube Data API v3 key
        const apiKey = 'AIzaSyCzPqPSog2Ob2hULTiKHdGxh4D65f9t_Sw';
        const resp = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${apiKey}`
        );
        const data = await resp.json();
        const count = data?.items?.[0]?.statistics?.viewCount;
        if (count) setLiveViews(Number(count).toLocaleString());
      } catch {}
    }
    fetchLiveViews();
    interval = setInterval(fetchLiveViews, 10000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Video Information</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-shrink-0">
          {id ? (
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full md:w-80 h-48 object-cover rounded-xl"
            />
          ) : (
            <img
              src={thumbnail}
              alt={title}
              className="w-full md:w-80 h-48 object-cover rounded-xl"
            />
          )}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
            {duration}
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="text-xl font-medium text-gray-900 leading-tight">
            {title}
          </h4>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{liveViews} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{duration}</span>
            </div>
          </div>
          <p className="text-gray-700 font-medium">
            By {channel}
          </p>
          <div className="pt-2">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✓ Ready for download
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};