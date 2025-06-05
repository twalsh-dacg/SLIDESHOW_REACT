export const DEFAULT_SLIDESHOW_SETTINGS = {
  transitionType: 'fade' as const,
  transitionDuration: 0.5,
  autoPlay: true,
  autoPlayInterval: 5,
  loop: true,
  shuffle: false,
  showControls: true,
  theme: 'system' as const,
};

export const ALLOWED_MEDIA_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
];

export const MAX_FILE_SIZE_MB = 50;
