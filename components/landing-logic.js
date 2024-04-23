'use client';

import Navigation from './navigation';
import { useState } from 'react';

export default function LandingLogic({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
      <Navigation isBlack={data[activeIndex].isblack} />
      <div className='h-screen w-screen absolute left-0 top-0'>
        <div
          role='button'
          aria-label='previous'
          className='absolute w-[50%] z-10 bottom-0 top-0 cursor-w-resize left-0'
          onClick={prevSlide}
        ></div>
        <div
          role='button'
          aria-label='next'
          className='absolute w-[50%] z-10 bottom-0 top-0 cursor-e-resize right-0'
          onClick={nextSlide}
        ></div>
      </div>
      <div className='min-h-screen flex justify-center flex-col items-center animate-fadeIn'>
        <p>{data[activeIndex].client}</p>
        <p>{data[activeIndex].description}</p>
      </div>
    </>
  );
}
