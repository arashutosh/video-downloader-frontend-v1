import { useState, useRef } from 'react';

interface VideoData {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  channel: string;
}

interface Format {
  id: string;
  type: 'video' | 'audio';
  quality: string;
  format: string;
  size: string;
  extension: string;
}

export const useYouTubeDownloader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [formats, setFormats] = useState<Format[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastUrlRef = useRef<string | null>(null);

  const fetchVideoInfo = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setVideoData(null);
    setFormats([]);
    lastUrlRef.current = url;
    try {
      const response = await fetch('http://localhost:5001/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch video information.');
      }
      const data = await response.json();
      setVideoData({
        title: data.title || '',
        thumbnail: data.thumbnail || '',
        duration: data.duration || '',
        views: data.views || '',
        channel: data.channel || '',
      });
      setFormats(
        (data.formats || []).map((f: any, idx: number) => ({
          id: f.format_id || String(idx),
          type: f.hasAudio && f.vcodec !== 'none' ? 'video' : 'audio',
          quality: f.quality || f.resolution || '',
          format: f.mimeType || '',
          size: f.filesize ? `${(f.filesize / (1024 * 1024)).toFixed(1)} MB` : 'Unknown',
          extension: f.mimeType || '',
        }))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to fetch video information. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFormat = async (formatId: string) => {
    setDownloadingId(formatId);
    try {
      if (!videoData) throw new Error('No video data available');
      const formatObj = formats.find(f => f.id === formatId);
      if (!formatObj) throw new Error('Format not found');
      const url = lastUrlRef.current;
      if (!url) throw new Error('No URL available for download.');
      const downloadUrl = `http://localhost:5001/api/merge_download?url=${encodeURIComponent(url)}&format_id=${encodeURIComponent(formatId)}`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message || 'Download failed. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const reset = () => {
    setVideoData(null);
    setFormats([]);
    setError(null);
    setDownloadingId(null);
    lastUrlRef.current = null;
  };

  return {
    isLoading,
    videoData,
    formats,
    downloadingId,
    error,
    fetchVideoInfo,
    downloadFormat,
    reset
  };
};