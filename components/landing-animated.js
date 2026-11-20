'use client';
import NavigationConcept from '@/components/navigation-concept';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LandingAnimated() {
  const secondVideoRef = useRef(null);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;

    gsap.set('.second-vd-wrapper', { opacity: 1 });

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

  useEffect(() => {
    const video = secondVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
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
          You have the mission, the point of view, the way of doing things
          nobody else has. What&apos;s missing is the visual language that
          makes people feel it. That&apos;s where I begin.
        </h2>
      </section>

      {/* Jason images */}
      <section className='jason relative z-10 pt-16 pb-0 md:pt-24 md:pb-0 lg:pt-12 lg:pb-0 flex lg:flex-row flex-col justify-between gap-5 overflow-x-hidden'>
        <div className='max-w-lg'>
          <div className='bg-yellow h-[90vh] w-auto'>
            <img
              src='/photos/aigeneration/photo2.png'
              className='size-full object-cover [object-position:80%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out'
            />
          </div>
        </div>
        <div className='space-y-5 mt-12 lg:mt-96 img-box'>
          <div className='bg-yellow lg:h-[80vh] w-auto'>
            <img
              src='/photos/aigeneration/photo5.png'
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

      {/* Second Video Section */}
      <div
        id='second-video-wrapper'
        className='relative block pt-6 pb-16 md:pt-10 md:pb-24 lg:pt-4 lg:pb-12'
      >
        <section className='second-vd-wrapper relative'>
          <div className='h-screen overflow-hidden'>
            <video
              ref={secondVideoRef}
              controls
              autoPlay
              loop
              muted
              playsInline
              preload='metadata'
              crossOrigin='anonymous'
              src='/videos/portfolio_mareopal_musik-2.mp4'
              className='second-vd w-full h-full object-cover will-change-transform'
            />
          </div>
        </section>
      </div>

      {/* One real thing text */}
      <section className='relative z-10 px-6 py-16 md:px-16 md:py-24 lg:px-6 lg:py-12'>
        <h1
          className='leading-[1] font-long uppercase text-5xl lg:text-6xl mb-4 lg:max-w-[450px]'
          style={{ color: '#f5f5f5' }}
        >
          One real thing becomes a whole world.
        </h1>
        <h2
          className='leading-relaxed md:text-2xl text-lg font-light max-w-3xl lg:max-w-[450px]'
          style={{ color: '#f5f5f5' }}
        >
          I start from something that already exists inside the brand: a
          gesture, a photograph, a word. From that seed I build the identity,
          the website, and the system that lets you keep making new work
          without losing the thread. One week for the seed. Three to four for
          the whole world.
        </h2>
      </section>
    </>
  );
}
