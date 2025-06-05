import { MediaItem } from './media';

export interface SlideshowState {
  currentSlideIndex: number;
  isPlaying: boolean;
  slides: MediaItem[];
  settings: {
    transitionType: 'fade' | 'slide' | 'zoom';
    transitionDuration: number;
  };
}

export type SlideshowAction = 
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'GO_TO_SLIDE'; payload: number }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_SLIDES'; payload: MediaItem[] }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SlideshowState['settings']> };
