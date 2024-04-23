'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AnimationOut({ children, animationClass }) {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      // Apply the animation here
      document.querySelector(animationClass).classList.add('animate-fadeOut');
    };
    if (pathname !== pathname) {
      handleRouteChange();
    }
  }, [animationClass, pathname]);

  return children;
}
