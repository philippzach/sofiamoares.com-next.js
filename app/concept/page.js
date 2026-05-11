'use client';
import NavigationConcept from '@/components/navigation-concept';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger);

export default function Page() {
  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);
  const secondVideoRef = useRef(null);
  const maskRef = useRef();

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;

    gsap.set('.second-vd-wrapper', { opacity: 1 });
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    //Text Animation
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

    //Lucia Animation
    gsap.to(
      '.lucia-life .img-box',
      {
        scrollTrigger: {
          trigger: '.lucia-life',
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

    // Fade the second video out as lucia-life enters
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.lucia-life',
          start: 'top 45%',
          end: '80% center',
          scrub: 2,
          //markers: true,
        },
      })
      .to('.second-vd', { opacity: 0, duration: 0.5, ease: 'power1.Out' });

    // Scrub the second video's currentTime to scroll position.
    // Set up only after metadata is known so the trigger maps to a real duration.
    const initializeSecondVideoScrub = () => {
      const video = secondVideoRef.current;
      if (!video) return;

      const setupScrub = () => {
        if (!video.duration || isNaN(video.duration)) return;

        const proxy = { time: 0 };
        gsap.to(proxy, {
          time: video.duration,
          ease: 'none',
          scrollTrigger: {
            trigger: '#second-video-wrapper',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          onUpdate: () => {
            if (video.readyState < 2) return;
            try {
              video.currentTime = Math.min(proxy.time, video.duration - 0.05);
            } catch (e) {
              // seeking can throw before buffering catches up; safe to ignore
            }
          },
        });

        ScrollTrigger.refresh();
      };

      video.load();
      if (video.readyState >= 1) {
        setupScrub();
      } else {
        video.addEventListener('loadedmetadata', setupScrub, { once: true });
      }
    };

    initializeSecondVideoScrub();
  }, []);

  return (
    <section>
      <NavigationConcept />
      {/* Palm Tree */}
      <div className='relative h-screen w-full'>
        <Image
          src='/photos/aigeneration/palm2.webp'
          alt='AI Generation Background'
          fill
          priority
          className='object-cover object-center scale-100'
          quality={100}
        />
      </div>
      {/* Jason text */}
      <section className='relative z-10 px-10 lg:px-40 2xl:px-80 mt-16 lg:mt-32'>
        <h1 className='leading-[1] font-long uppercase text-5xl lg:text-6xl mb-4'>
          The world you carry inside already has a shape.
        </h1>
        <h2 className='leading-[1] md:text-2xl text-lg font-light max-w-3xl'>
          You have the vision, the mission, the feeling of what it should be
          but not yet the visual language to match it. That&apos;s exactly
          where I begin.
        </h2>
      </section>

      {/* Jason images */}
      <section className='jason relative z-10 lg:ps-40 2xl:ps-80 ps-10 py-12 lg:py-40 mt-16 lg:mt-60 flex lg:flex-row flex-col justify-between gap-5 w-dvw overflow-x-hidden'>
        <div className='max-w-lg'>
          <div className='bg-yellow h-[90vh] w-auto -translate-x-5'>
            <img
              src='/photos/aigeneration/photo1.png'
              className='size-full object-cover [object-position:80%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out'
            />
          </div>
        </div>
        <div className='space-y-5 mt-12 lg:mt-96 img-box'>
          <div className='bg-yellow lg:h-[80vh] w-auto -translate-x-5'>
            <img
              src='/photos/aigeneration/photo8.png'
              className='size-full object-cover [object-position:5%_center] hover:scale-[0.98] transition duration-700 ease-in-out'
            />
          </div>
          <div className='bg-yellow h-[50vh] md:w-[60%] -translate-x-5'>
            <img
              src='/photos/aigeneration/photo3.png'
              className='size-full object-cover [object-position:42%_center] hover:scale-[0.97] transition duration-700 ease-in-out'
            />
          </div>
        </div>
      </section>

      {/* Second Video Section */}
      <div id='second-video-wrapper' className='relative hidden lg:block mt-16 lg:mt-32'>
        <section className='second-vd-wrapper relative'>
          <div className='h-screen overflow-hidden'>
            <video
              ref={secondVideoRef}
              muted
              playsInline
              preload='auto'
              crossOrigin='anonymous'
              src='/videos/animation3-video.mp4'
              className='second-vd w-full h-full object-cover will-change-transform'
            />
          </div>
        </section>
      </div>

      {/* Lucia text */}
      <section className='relative z-10 px-10 lg:px-40 2xl:px-80 mt-16 lg:mt-32'>
        <h1 className='leading-[1] font-long uppercase text-5xl lg:text-6xl mb-4'>
          I translate the invisible into the visible.
        </h1>
        <h2 className='leading-[1] md:text-2xl text-lg font-light max-w-3xl'>
          Visual worlds aren&apos;t created they&apos;re excavated. From your
          obsessions, your contradictions, the vision you&apos;ve been
          carrying all along. What emerges doesn&apos;t feel designed. It
          feels inevitable.
        </h2>
      </section>

      {/* Lucia images */}
      <section className='lucia-life relative z-10 lg:pe-40 2xl:pe-80 pe-10 ps-10 py-12 lg:py-40 mt-16 lg:mt-32 flex lg:flex-row-reverse flex-col justify-between gap-5 w-dvw overflow-x-hidden'>
        <div className='max-w-lg'>
          <div className='bg-yellow h-[90vh] w-auto translate-x-5'>
            <img
              src='/photos/aigeneration/photo2.png'
              className='size-full object-cover [object-position:20%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out'
            />
          </div>
        </div>
        <div className='space-y-5 mt-12 lg:mt-96 img-box'>
          <div className='bg-yellow lg:h-[80vh] w-auto translate-x-5'>
            <img
              src='/photos/aigeneration/photo4.png'
              className='size-full object-cover [object-position:95%_center] hover:scale-[0.98] transition duration-700 ease-in-out'
            />
          </div>
          <div className='bg-yellow h-[50vh] md:w-[60%] translate-x-5'>
            <img
              src='/photos/aigeneration/photo6.png'
              className='size-full object-cover [object-position:58%_center] hover:scale-[0.97] transition duration-700 ease-in-out'
            />
          </div>
        </div>
      </section>
      <section>
        <div className='calltoaction pb-14 pt-14 flex justify-center my-16 lg:my-60 relative z-20'>
          <Link
            href='/studio'
            className='text-6xl underline hover:opacity-30 duration-150 cursor-pointer text-gray-300'
          >
            Get in touch ↵
          </Link>
        </div>
      </section>
    </section>
  );
}
