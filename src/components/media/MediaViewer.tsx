import React from 'react';

type MediaViewerProps = {
  mediaUrl: string;
  mediaType: 'image' | 'video';
};

export const MediaViewer = ({ mediaUrl, mediaType }: MediaViewerProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {mediaType === 'image' ? (
        <img 
          src={mediaUrl} 
          alt="Slide content" 
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <video 
          src={mediaUrl} 
          controls
          className="max-h-full max-w-full"
        />
      )}
    </div>
  );
};
