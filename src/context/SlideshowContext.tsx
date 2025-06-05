import * as React from 'react';
import { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import { MediaItem } from '../types/media';
import { SlideshowSettings, defaultSettings } from '../types/settings';

type SlideshowState = {
  media: MediaItem[];
  currentSlideIndex: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  settings: SlideshowSettings;
  error: string | null;
};

type SlideshowAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GO_TO_SLIDE'; payload: number }
  | { type: 'SET_MEDIA'; payload: MediaItem[] }
  | { type: 'ADD_MEDIA'; payload: MediaItem }
  | { type: 'REMOVE_MEDIA'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SlideshowSettings> }
  | { type: 'TOGGLE_FULLSCREEN' }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: SlideshowState = {
  media: [],
  currentSlideIndex: 0,
  isPlaying: false,
  isFullscreen: false,
  settings: defaultSettings,
  error: null,
};

function slideshowReducer(state: SlideshowState, action: SlideshowAction): SlideshowState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'NEXT': {
      const nextIndex = state.currentSlideIndex + 1;
      const shouldLoop = state.settings.playback.loop && state.media.length > 0;
      return {
        ...state,
        currentSlideIndex: shouldLoop ? nextIndex % state.media.length : Math.min(nextIndex, state.media.length - 1),
      };
    }
    case 'PREV': {
      const prevIndex = state.currentSlideIndex - 1;
      const shouldLoop = state.settings.playback.loop && state.media.length > 0;
      return {
        ...state,
        currentSlideIndex: prevIndex < 0 ? (shouldLoop ? state.media.length - 1 : 0) : prevIndex,
      };
    }
    case 'GO_TO_SLIDE':
      return {
        ...state,
        currentSlideIndex: Math.max(0, Math.min(action.payload, state.media.length - 1)),
      };
    case 'SET_MEDIA':
      return { ...state, media: action.payload, currentSlideIndex: 0 };
    case 'ADD_MEDIA':
      return { ...state, media: [...state.media, action.payload] };
    case 'REMOVE_MEDIA':
      return {
        ...state,
        media: state.media.filter((item) => item.id !== action.payload),
        currentSlideIndex: state.media.length <= 1 ? 0 : Math.min(state.currentSlideIndex, state.media.length - 2),
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
          playback: { ...state.settings.playback, ...action.payload.playback },
          display: { ...state.settings.display, ...action.payload.display },
          audio: { ...state.settings.audio, ...action.payload.audio },
        },
      };
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullscreen: !state.isFullscreen };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

type SlideshowContextType = {
  state: SlideshowState;
  dispatch: React.Dispatch<SlideshowAction>;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  goToSlide: (index: number) => void;
  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;
  updateSettings: (settings: Partial<SlideshowSettings>) => void;
  toggleFullscreen: () => void;
};

const SlideshowContext = createContext<SlideshowContextType | undefined>(undefined);

export const SlideshowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(slideshowReducer, initialState);

  // Action creators
  const play = useCallback(() => dispatch({ type: 'PLAY' }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const prev = useCallback(() => dispatch({ type: 'PREV' }), []);
  const goToSlide = useCallback((index: number) => {
    dispatch({ type: 'GO_TO_SLIDE', payload: index });
  }, []);
  
  const addMedia = useCallback((media: MediaItem) => {
    dispatch({ type: 'ADD_MEDIA', payload: media });
  }, []);
  
  const removeMedia = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_MEDIA', payload: id });
  }, []);
  
  const updateSettings = useCallback((settings: Partial<SlideshowSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);
  
  const toggleFullscreen = useCallback(() => {
    dispatch({ type: 'TOGGLE_FULLSCREEN' });
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!state.isPlaying || !state.settings.playback.autoplay || state.media.length === 0) return;

    const interval = setInterval(() => {
      next();
    }, state.settings.playback.imageDuration * 1000);

    return () => clearInterval(interval);
  }, [state.isPlaying, state.settings.playback.autoplay, state.settings.playback.imageDuration, state.media.length, next]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
        case ' ':
          state.isPlaying ? pause() : play();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isPlaying, next, prev, play, pause, toggleFullscreen]);

  return (
    <SlideshowContext.Provider value={{
      state,
      dispatch,
      play,
      pause,
      next,
      prev,
      goToSlide,
      addMedia,
      removeMedia,
      updateSettings,
      toggleFullscreen,
    }}>
      {children}
    </SlideshowContext.Provider>
  );
};

export const useSlideshow = () => {
  const context = useContext(SlideshowContext);
  if (!context) {
    throw new Error('useSlideshow must be used within a SlideshowProvider');
  }
  return context;
};
