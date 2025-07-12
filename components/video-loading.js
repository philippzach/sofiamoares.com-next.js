import React from 'react';

export default function VideoLoading({ isBlack }) {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div
        className={`w-16 h-16 ${
          isBlack ? 'bg-white/20' : 'bg-black/20'
        } rounded-full animate-pulse`}
      ></div>
    </div>
  );
}
