'use client';
import { useEffect } from 'react';
import { animatePageIn } from '@/components/animation/animations';

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id='transition-element'
        className='w-screen h-screen bg-white z-100 fixed top-0 left-0'
      ></div>
      {children}
    </div>
  );
}
