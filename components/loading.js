'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Loading() {
  const container = useRef();
  useGSAP(() => {
    gsap.to('.outer', {
      opacity: 1,
      x: 0,
      stagger: 0.15, // delay between each element's animation start
      yoyo: true, // makes the animation alternate between forward and reverse
      repeat: 1, // makes the animation repeat indefinitely
      duration: 0.6, // duration of one cycle of the animation
    });
    gsap.to('.inner', {
      height: '100%',
      stagger: 0.15,
      yoyo: true,
      repeat: 1,
      duration: 0.6,
    });
    gsap.to('.fade', {
      opacity: 0,
      duration: 0.3,
      delay: 2.25,
      ease: 'power1.out',
    });
  });

  return (
    <>
      <div className='fade opacity-100 flex items-center h-screen justify-center bg-gray-500'>
        <div className='flex flex-col text-left justify-center items-start min-w-[50%] h-screen leading-20 text-black text-7xl font-extrabold leading-[0.9] tracking-tighter overflow-hidden'>
          <div className='text-gray-50 h-1/2' ref={container}>
            <div className='outer opacity-0 translate-x-5'>
              <div className='inner h-0'>
                <span>New</span>
              </div>
            </div>
            <div className='outer opacity-0 translate-x-5'>
              <div className='inner h-0'>
                <span>Ideas</span>
              </div>
            </div>
            <div className='outer opacity-0 translate-x-5'>
              <div className='inner h-0 text-right'>
                <span>&</span>
              </div>
            </div>
            <div className='outer opacity-0 translate-x-5'>
              <div className='inner h-0'>
                <span>Captivating</span>
              </div>
            </div>
            <div className='outer opacity-0 translate-x-5'>
              <div className='inner h-0'>
                <span>Experiences</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
