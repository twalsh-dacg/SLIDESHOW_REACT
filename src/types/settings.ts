export interface PlaybackSettings {
  autoplay: boolean;
  loop: boolean;
  shuffle: boolean;
  imageDuration: number; // seconds
  transitionDuration: number; // milliseconds
  transitionType: 'fade' | 'slide' | 'none';
}

export interface DisplaySettings {
  fitMode: 'contain' | 'cover' | 'fill';
  backgroundColor: string;
  showProgress: boolean;
  showControls: boolean;
}

export interface AudioSettings {
  muted: boolean;
  volume: number;
}

export interface SlideshowSettings {
  playback: PlaybackSettings;
  display: DisplaySettings;
  audio: AudioSettings;
}

export const defaultSettings: SlideshowSettings = {
  playback: {
    autoplay: true,
    loop: true,
    shuffle: false,
    imageDuration: 5,
    transitionDuration: 500,
    transitionType: 'fade',
  },
  display: {
    fitMode: 'contain',
    backgroundColor: '#000000',
    showProgress: true,
    showControls: true,
  },
  audio: {
    muted: true,
    volume: 0.5,
  },
};

export interface AppSettings {
  slideshow: SlideshowSettings;
  media: {
    allowedTypes: string[];
    maxFileSize: number; // in MB
  };
}
