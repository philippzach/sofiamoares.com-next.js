'use client';
import NavigationConcept from '@/components/navigation-concept';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LandingAnimated() {
  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;

    gsap.to(
      '.jason .img-box',
      {
        scrollTrigger: {
          trigger: '.jason',
          start: 'top center',
          end: '80% center',
          scrub: 2,
        },
        y: -300,
        duration: 1,
        ease: 'power1.inOut',
      },
      '<'
    );

    if (!isDesktop) {
      return;
    }
  }, []);

  return (
    <>
      <NavigationConcept />
      {/* Palm Tree */}
      <div className='relative h-screen w-full'>
        <Image
          src='/photos/aigeneration/mareopal9.jpg'
          alt='AI Generation Background'
          fill
          priority
          className='object-cover object-center scale-100'
          quality={100}
        />
      </div>
      {/* Jason text */}
      <section className='relative z-10 px-6 py-16 md:px-16 md:py-24 lg:px-6 lg:py-12'>
        <h1
          className='leading-[1] font-long uppercase text-5xl lg:text-6xl mb-4 lg:max-w-[450px]'
          style={{ color: '#f5f5f5' }}
        >
          The world you carry inside already has a shape.
        </h1>
        <h2
          className='leading-relaxed md:text-2xl text-lg font-light max-w-3xl lg:max-w-[450px]'
          style={{ color: '#f5f5f5' }}
        >
          You have the vision, the mission, the feeling of what it should be
          but not yet the visual language to match it. That&apos;s exactly
          where I begin.
        </h2>
      </section>

      {/* Jason images */}
      <section className='jason relative z-10 py-16 md:py-24 lg:py-12 flex lg:flex-row flex-col justify-between gap-5 overflow-x-hidden'>
        <div className='max-w-lg'>
          <div className='bg-yellow h-[90vh] w-auto'>
            <img
              src='/photos/aigeneration/mareopal6.png'
              className='size-full object-cover [object-position:80%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out'
            />
          </div>
        </div>
        <div className='space-y-5 mt-12 lg:mt-96 img-box'>
          <div className='bg-yellow lg:h-[80vh] w-auto'>
            <img
              src='/photos/aigeneration/photo2.png'
              className='size-full object-cover [object-position:5%_center] hover:scale-[0.98] transition duration-700 ease-in-out'
            />
          </div>
          <div className='bg-yellow h-[50vh] md:w-[60%]'>
            <img
              src='/photos/aigeneration/mareopal4.jpg'
              className='size-full object-cover [object-position:42%_center] hover:scale-[0.97] transition duration-700 ease-in-out'
            />
          </div>
        </div>
      </section>

      {/* Lucia text */}
      <section className='relative z-10 px-6 py-16 md:px-16 md:py-24 lg:px-6 lg:py-12'>
        <h1
          className='leading-[1] font-long uppercase text-5xl lg:text-6xl mb-4 lg:max-w-[450px] lg:ml-auto'
          style={{ color: '#f5f5f5' }}
        >
          I translate the invisible into the visible.
        </h1>
        <h2
          className='leading-relaxed md:text-2xl text-lg font-light max-w-3xl lg:max-w-[450px] lg:ml-auto'
          style={{ color: '#f5f5f5' }}
        >
          Visual worlds aren&apos;t created. They&apos;re excavated. From your
          obsessions, your contradictions, the vision you&apos;ve been
          carrying all along. What emerges doesn&apos;t feel designed. It
          feels inevitable.
        </h2>
      </section>
    </>
  );
}
