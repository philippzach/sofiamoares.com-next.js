'use client';

import { Image as DatocmsImage } from 'react-datocms';
import { useState } from 'react';

export default function SquareImage({ carousel }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carousel.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className='relative'>
      <div
        role='button'
        aria-label='previous'
        className='absolute w-[50%] h-full z-30 top-0 left-0 cursor-w-resize'
        onClick={prevSlide}
      ></div>
      <div
        role='button'
        aria-label='next'
        className='absolute w-[50%] h-full z-30 top-0 right-0 cursor-e-resize'
        onClick={nextSlide}
      ></div>
      <div className='flex items-center justify-center'>
        <ul className='absolute bottom-12  z-30 flex flex-row items-end justify-center items-center gap-2'>
          {carousel.map((_, index) => (
            <li
              key={index}
              className={`h-2.5 w-2.5 rounded-full border-2 
      
      ${index === activeIndex ? 'bg-gray-200' : ''}
      border-gray-200`}
            ></li>
          ))}
        </ul>
      </div>
      {carousel.map((item, index) => {
        const { responsiveImage, title } = item;
        return (
          <div
            key={index}
            className={`h-full w-full items-center flex justify-center  left-0 top-0  ${
              index !== activeIndex ? 'hidden' : ''
            }`}
          >
            <DatocmsImage
              data={{
                ...responsiveImage,
                alt: `Cover Image for ${title}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
