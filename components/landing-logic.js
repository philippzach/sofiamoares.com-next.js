'use client';

import Navigation from './navigation';
import { useState, useEffect } from 'react';
import { Image as DatocmsImage } from 'react-datocms';
import MuxPlayer from '@mux/mux-player-react';
import VideoJS from './video-player';
import Link from 'next/link';

import Cookies from 'js-cookie';
import Loading from './loading';
import { he } from 'date-fns/locale';

export default function LandingLogic({ data, hasVisited }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(!hasVisited);

  useEffect(() => {
    if (hasVisited === false) {
      const timer = setTimeout(() => {
        Cookies.set('animation', 'true', { expires: 0.007 });
        setLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

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
  const url = data[activeIndex].urltoproject;
  const { responsiveImage, title } = data[activeIndex].media;
  const { client, description } = data[activeIndex];
  const textColor = isBlack ? 'text-white' : '';
  const loadingTrue = loading ? 'visible' : 'hidden';
  const loadingFalse = loading ? 'hidden' : 'visible';
  return (
    <>
      <div className={`${loadingTrue}`}>
        <Loading />
      </div>
      <div className={`fade-in ${loadingFalse}`}>
        <Navigation isBlack={data[activeIndex].isblack} />
        <div className='h-screen w-screen absolute left-0 top-0'>
          <div
            role='button'
            aria-label='previous'
            className='absolute w-[50%] z-20 bottom-0 top-0 cursor-w-resize left-0'
            onClick={prevSlide}
          ></div>
          <div
            role='button'
            aria-label='next'
            className='absolute w-[50%] z-20 bottom-0 top-0 cursor-e-resize right-0'
            onClick={nextSlide}
          ></div>
          <ul className='absolute z-10 bottom-16 top-0 right-0 left-0 flex flex-row items-end justify-center gap-2'>
            {data.map((_, index) => (
              <li
                key={index}
                className={`h-2.5 w-2.5 rounded-full border-2 
                ${index === activeIndex && !isBlack ? 'bg-slate-700' : ''}
                ${index === activeIndex && isBlack ? 'bg-gray-200' : ''}
                ${isBlack ? 'border-gray-200' : 'border-slate-700'}`}
              ></li>
            ))}
          </ul>
        </div>

        {data.map((_, index) => (
          <div
            key={index}
            className={`h-screen w-screen items-center flex justify-center absolute left-0 top-0 animate-fadeIn ${
              index !== activeIndex ? 'hidden' : ''
            }`}
          >
            {isVideo ? (
              <VideoJS
                options={{
                  sources: [
                    { src: data[activeIndex].videolink, type: 'video/mp4' },
                  ],
                  poster: data[activeIndex].videolink + '.png',
                  autoplay: 'muted',
                  controls: false,
                  loop: true,
                  preload: 'auto',
                  loadingSpinner: false,
                  height: '1200',
                }}
              />
            ) : (
              <div className='p-10 md:p-48'>
                <DatocmsImage
                  data={{
                    ...responsiveImage,
                    alt: `Cover Image for ${title}`,
                  }}
                  className='w-full h-full object-contain object-center'
                />
              </div>
            )}
          </div>
        ))}

        <div
          className={`font-secondary text-sm bottom-3 cursor-text left-3 absolute z-20 tracking-tight leading-tight ${textColor}`}
        >
          <Link href={`/work/${url}`} className='hover:underline'>
            <p>{client}</p>
          </Link>
          <p>{description}</p>
        </div>
        <ul
          className={`text-lg invisible md:visible flex items-end bottom-3 right-3 absolute z-20 ${textColor}`}
        >
          <li className='pr-8 font-bold tracking-tight leading-tight'>
            <span className='font-light'>Studio</span> Madeira, Portugal
          </li>
          <li className='cursor-pointer font-bold tracking-tight leading-tight hover:underline'>
            <a className='' href='mailto:sofiamoraes@gmail.com'>
              hello@sofiamoraes.com
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
