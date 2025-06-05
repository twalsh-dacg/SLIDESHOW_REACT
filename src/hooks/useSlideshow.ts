import { useEffect } from 'react';
import { useSlideshow } from '../context/SlideshowContext';

export const useSlideshowControls = () => {
  const { state, dispatch } = useSlideshow();

  // Auto-advance slides when playing
  useEffect(() => {
    if (!state.isPlaying || state.slides.length === 0) return;

    const currentSlide = state.slides[state.currentSlideIndex];
    const timeout = setTimeout(() => {
      dispatch({ type: 'NEXT_SLIDE' });
    }, currentSlide.duration * 1000);

    return () => clearTimeout(timeout);
  }, [state.currentSlideIndex, state.isPlaying, state.slides, dispatch]);

  return {
    currentSlideIndex: state.currentSlideIndex,
    isPlaying: state.isPlaying,
    slides: state.slides,
    nextSlide: () => dispatch({ type: 'NEXT_SLIDE' }),
    prevSlide: () => dispatch({ type: 'PREV_SLIDE' }),
    goToSlide: (index: number) => dispatch({ type: 'GO_TO_SLIDE', payload: index }),
    togglePlay: () => dispatch({ type: 'TOGGLE_PLAY' }),
    setSlides: (slides: any) => dispatch({ type: 'SET_SLIDES', payload: slides }),
  };
};
