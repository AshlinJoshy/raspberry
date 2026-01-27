import { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  type: 'video' | 'image';
  url: string;
  duration: number; // seconds
}

// Mock playlist generator
async function fetchPlaylist(screenId: string): Promise<MediaItem[]> {
  console.log('Fetching playlist for:', screenId);
  // In a real app, this would call the Edge Function
  // For now, we return mock data or fetch approved creatives for this screen
  // Let's simulate a network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1920&q=80',
      duration: 10,
    },
    {
      id: '2',
      type: 'video',
      url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      duration: 10,
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
      duration: 5,
    }
  ];
}

interface PlayerAppProps {
  screenId: string;
}

export default function PlayerApp({ screenId }: PlayerAppProps) {
  useEffect(() => {
    console.log('Player initialized for screen:', screenId);
  }, [screenId]);
  const [playlist, setPlaylist] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylist(screenId).then(items => {
      setPlaylist(items);
      setLoading(false);
    });
  }, [screenId]);

  useEffect(() => {
    if (playlist.length === 0) return;

    const currentItem = playlist[currentIndex];
    
    if (currentItem.type === 'image') {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % playlist.length);
      }, currentItem.duration * 1000);
      return () => clearTimeout(timer);
    }
    // For video, the onEnded event will trigger next
  }, [currentIndex, playlist]);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading content...</div>;
  if (playlist.length === 0) return <div className="h-screen bg-black flex items-center justify-center text-white">No content scheduled.</div>;

  const currentItem = playlist[currentIndex];

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex items-center justify-center">
      {currentItem.type === 'image' ? (
        <img 
          src={currentItem.url} 
          alt="Ad Content" 
          className="w-full h-full object-contain"
        />
      ) : (
        <video
          key={currentItem.id} // Force re-render on change
          src={currentItem.url}
          className="w-full h-full object-contain"
          autoPlay
          muted // Browsers require mute for autoplay usually, but strictly ad screens might have sound. For MVP, mute to ensure autoplay works.
          playsInline
          onEnded={() => setCurrentIndex((prev) => (prev + 1) % playlist.length)}
        />
      )}
      
      {/* Debug Info Overlay - hidden in prod */}
      <div className="absolute top-0 left-0 bg-black/50 text-white text-xs p-2">
        Screen ID: {screenId} | Item: {currentIndex + 1}/{playlist.length}
      </div>
    </div>
  );
}
