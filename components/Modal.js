'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Modal({ isOpen, onClose, children, image }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get current scroll position
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  return (
    <div
      className='fixed inset-0 z-50 bg-black bg-opacity-50'
      onClick={onClose}
      style={{
        top: `${scrollY}px`,
        height: '100vh',
      }}
    >
      <div
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] max-h-[90vh]'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white bg-opacity-80 rounded-full text-gray-700 hover:bg-opacity-70 transition-all'
          onClick={onClose}
        >
          ×
        </button>
        <div className='relative'>
          <Image
            src={image.src}
            alt={image.alt || 'Modal image'}
            width={1200}
            height={800}
            className='object-contain rounded-lg max-h-[90vh] w-auto'
            priority
          />
        </div>
      </div>
    </div>
  );
}
