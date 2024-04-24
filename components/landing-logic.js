'use client';

import Navigation from './navigation';
import { useState, useEffect } from 'react';
import { Image as DatocmsImage } from 'react-datocms';
import MuxPlayer from '@mux/mux-player-react';
import Cookies from 'js-cookie';

export default function LandingLogic({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  /*  useEffect(() => {
    // Check if it's the user's first visit and if the animation hasn't been shown in this session
    if (!Cookies.get('visitedBefore')) {
      // If it's the first visit, show the loading animation
      setLoading(true);
      console.log('First visit');
      // Set the 'visitedBefore' cookie
      Cookies.set('visitedBefore', 'true', { expires: 1 });
      // Set the 'animationShown' flag in sessionStorage
      // Hide the loading animation after 1.4 seconds
      setTimeout(() => {
        setLoading(false);
      }, 1400);
    }
  }, []); */

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
  //Setting up IsBlack and IsVideo and changing textColor to white if isBlack is true
  const isBlack = data[activeIndex].isblack;
  const isVideo = data[activeIndex].isvideo;
  const { responsiveImage, title } = data[activeIndex].media;
  const { client, description } = data[activeIndex];
  const textColor = isBlack ? 'text-white' : '';
  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
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
          <div className='h-screen w-screen items-center flex justify-center absolute left-0 top-0  animate-fadeIn'>
            {isVideo ? (
              <MuxPlayer
                playbackId={data[activeIndex].media.video.muxPlaybackId}
                metadata={{}}
                autoPlay='muted'
                loop
                preload='auto'
                className='w-full h-full object-contain object-center'
              />
            ) : (
              <DatocmsImage
                data={{
                  ...responsiveImage,
                  alt: `Cover Image for ${title}`,
                }}
                className='w-full h-full object-contain object-center'
              />
            )}
          </div>
          <div
            className={`text-base bottom-3 cursor-text left-3 absolute z-20 tracking-tighter leading-tight ${textColor}`}
          >
            <p>{client}</p>
            <p>{description}</p>
          </div>
          <ul
            className={`text-base invisible md:visible flex items-end bottom-3 right-3 absolute z-20 ${textColor}`}
          >
            <li className='pr-8 font-bold tracking-tighter leading-tight'>
              <span className='font-light'>Studio</span> Madeira, Portugal
            </li>
            <li className='cursor-pointer font-bold tracking-tighter leading-tight hover:underline'>
              <a className='' href='mailto:sofiamoraes@gmail.com'>
                hello@sofiamoraes.com
              </a>
            </li>
          </ul>
        </>
      )}
    </>
  );
}
