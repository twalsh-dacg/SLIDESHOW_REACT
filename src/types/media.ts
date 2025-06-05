export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  name: string;
  duration: number; // in seconds
  thumbnail: string;
  metadata: {
    size: number;
    format: string;
    dimensions: { width: number; height: number };
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaLibraryState {
  items: MediaItem[];
  currentItem: MediaItem | null;
  isLoading: boolean;
  error: string | null;
}

export interface PlaybackState {
  currentIndex: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  progress: number;
  duration: number;
  volume: number;
  muted: boolean;
}
