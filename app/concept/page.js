'use client';
import NavigationConcept from '@/components/navigation-concept';
import InfiniteScroll from '@/components/infinite-scroll';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { getPaginatedImages } from '@/lib/image-data';

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger);

export default function Page() {
  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);
  const videoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const headlineRef = useRef();
  const maskRef = useRef();

  // Helper function to fetch images for InfiniteScroll component
  const fetchImages = async (page, limit) => {
    // Simulate network delay for smoother loading experience
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Get paginated image data
    const images = getPaginatedImages(page, limit);

    // Transform the data to include Cloudinary URLs
    return images.map((image) => ({
      ...image,
      src: getCloudinaryUrl(image.publicId, {
        width: 800,
        height: 800,
        crop: 'fill',
        quality: 'auto',
        format: 'auto',
      }),
    }));
  };

  useGSAP(() => {
    // Start loading animation
    const loadingTl = gsap.timeline({ repeat: -1, yoyo: true });
    loadingTl.to('#blackhole', {
      scale: 1.05,
      duration: 2,
      ease: 'power2.inOut',
    });

    // Store timeline reference to kill it later
    window.loadingAnimation = loadingTl;

    //gsap.set('.first-vd-wrapper', { marginTop: '-150vh', opacity: 0 });
    gsap.set('.first-vd-wrapper', { opacity: 0 });
    gsap.set('.second-vd-wrapper', { maringTop: '-80vh', opacity: 0 });
    gsap.set('.jason', { marginTop: '-40vh' });
    gsap.set('.lucia-life', { marginTop: '-40vh' });
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
    gsap
      .timeline()
      .to('.animate1', {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.in',
      })

      .to('.animate2', {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.in',
      })
      .to('.animate4', {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.in',
      });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero-wrapper',
          start: 'top top',
          end: '+=150%',
          //pin: true,
          scrub: true,
          // markers: true,
        },
      })
      .to('.animate1', {
        opacity: 0,
        duration: 0.33,
        ease: 'power2.out4',
      })
      .to('.animate4', {
        opacity: 0,
        duration: 0.33,
        ease: 'power2.out4',
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero-wrapper',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          // markers: true,
        },
      })

      .to('#blackhole', {
        scale: 4.25,
        z: 0,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      })
      .fromTo(
        '#background',
        {
          scale: 1,
          transformOrigin: 'center center',
          ease: 'power1.out',
        },
        {
          scale: 1,
          transformOrigin: 'center center',
          ease: 'power1.out',
        },
        '<'
      );

    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#video-wrapper',
        start: '-=90% top ',
        end: '+=200%', // Increased for much smoother scrolling
        scrub: 1, // Add slight smoothing lag (0.1-2 range)
        //pin: true,
        //markers: true,
      },
    });

    videoTimeline.to('.first-vd-wrapper', {
      opacity: 1,
      duration: 0.5, // Much shorter for quicker fade-in
      ease: 'power4.out',
    });

    // Second Video Timeline
    const secondVideoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#second-video-wrapper',
        start: '-=90% top ',
        end: '+=200%',
        scrub: 1,
        //pin: true,
        //markers: true,
      },
    });

    secondVideoTimeline.to('.second-vd-wrapper', {
      opacity: 1,
      duration: 0.5,
      ease: 'power4.out',
    });

    //Text Animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.jason',
          start: 'top 45%',
          end: '80% center',
          scrub: 2,
          //markers: true,
        },
      })
      .to('.first-vd', { opacity: 0, duration: 0.5, ease: 'power1.Out' });

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

    // Handle video animation with proper error checking
    const handleVideoAnimation = () => {
      if (
        videoRef.current &&
        videoRef.current.duration &&
        !isNaN(videoRef.current.duration)
      ) {
        console.log('Video duration:', videoRef.current.duration);

        // Create a safer currentTime animation that respects buffering
        const videoElement = videoRef.current;
        const videoDuration = videoElement.duration;

        // Use a custom animation approach for better control
        videoTimeline.to(
          {},
          {
            duration: 3.966667,
            ease: 'none', // Linear for consistent playback
            onUpdate: function () {
              if (videoElement && videoDuration) {
                // Calculate progress (0 to 1)
                const progress = this.progress();
                // Convert to time, but leave small buffer at end
                const targetTime = Math.min(
                  progress * videoDuration,
                  videoDuration - 0.1
                );

                // Only update if the time is within buffered range
                try {
                  if (videoElement.readyState >= 2) {
                    // HAVE_CURRENT_DATA or better
                    videoElement.currentTime = targetTime;
                  }
                } catch (error) {
                  console.warn('Video seek error:', error);
                }
              }
            },
          },
          '<'
        );
      }
    };

    // Handle second video animation
    const handleSecondVideoAnimation = () => {
      if (
        secondVideoRef.current &&
        secondVideoRef.current.duration &&
        !isNaN(secondVideoRef.current.duration)
      ) {
        console.log('Second Video duration:', secondVideoRef.current.duration);

        const videoElement = secondVideoRef.current;
        const videoDuration = videoElement.duration;

        secondVideoTimeline.to(
          {},
          {
            duration: 3.966667,
            ease: 'none',
            onUpdate: function () {
              if (videoElement && videoDuration) {
                const progress = this.progress();
                const targetTime = Math.min(
                  progress * videoDuration,
                  videoDuration - 0.1
                );

                try {
                  if (videoElement.readyState >= 2) {
                    videoElement.currentTime = targetTime;
                  }
                } catch (error) {
                  console.warn('Second video seek error:', error);
                }
              }
            },
          },
          '<'
        );
      }
    };

    // Wait for video to be sufficiently loaded
    const initializeVideo = () => {
      if (videoRef.current) {
        const video = videoRef.current;

        // Force load the video
        video.load();

        const checkVideoReady = () => {
          if (video.readyState >= 3) {
            // HAVE_FUTURE_DATA - can play through
            console.log('Video ready for scrubbing');
            handleVideoAnimation();
          } else if (video.readyState >= 1) {
            // HAVE_METADATA
            console.log('Video metadata loaded, waiting for more data...');
            // Try to preload by seeking to different positions
            video.currentTime = 0;
            setTimeout(checkVideoReady, 100);
          }
        };

        if (video.readyState >= 3) {
          handleVideoAnimation();
        } else {
          video.addEventListener('loadedmetadata', checkVideoReady, {
            once: true,
          });
          video.addEventListener('canplaythrough', handleVideoAnimation, {
            once: true,
          });
        }
      }
    };

    // Initialize second video
    const initializeSecondVideo = () => {
      if (secondVideoRef.current) {
        const video = secondVideoRef.current;

        video.load();

        const checkVideoReady = () => {
          if (video.readyState >= 3) {
            console.log('Second video ready for scrubbing');
            handleSecondVideoAnimation();
          } else if (video.readyState >= 1) {
            console.log(
              'Second video metadata loaded, waiting for more data...'
            );
            video.currentTime = 0;
            setTimeout(checkVideoReady, 100);
          }
        };

        if (video.readyState >= 3) {
          handleSecondVideoAnimation();
        } else {
          video.addEventListener('loadedmetadata', checkVideoReady, {
            once: true,
          });
          video.addEventListener('canplaythrough', handleSecondVideoAnimation, {
            once: true,
          });
        }
      }
    };

    initializeVideo();
    initializeSecondVideo();
  }, []);

  // Handle background image loading and fade in
  const handleBackgroundLoad = () => {
    // Kill loading animation
    if (window.loadingAnimation) {
      window.loadingAnimation.kill();
    }

    // Reset blackhole scale, hide loading indicator, and fade in background
    gsap
      .timeline()
      .to('#loading-indicator', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(
        '#blackhole',
        {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.01'
      )
      .to(
        '#background',
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power4.out',
        },
        '-=0.02'
      );
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    window.location.href = '/studio';
  };

  const handleCtaClickAlt = (e) => {
    e.preventDefault();
    window.location.href = '/concept';
  };
  return (
    <section>
      <NavigationConcept />
      <div id='hero-wrapper' className='relative w-full z-1'>
        <div
          id='content'
          className='relative z-1 overflow-x-hidden h-screen w-full '
        >
          <main className='flex flex-col items-center  pb-10 px-2 md:px-0 max-w-5xl mx-auto w-full relative'>
            {/* Pinned Headline Container */}
            <div className='headline-container w-full relative z-10'>
              <div ref={headlineRef} className='relative'>
                <div className='animate1 opacity-0 text-center mb-6 text-lg md:text-xl font-secondary text-white/80 mt-32'>
                  Welcome to my inner studio
                </div>
                {/* <h1 className='animate2 opacity-0 text-center font-bold text-[2.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] tracking-tight mb-4 font-sans'>
                  IMAGINING
                  <br />
                  NEW REALITIES
                </h1> */}
              </div>
              <div className=' z10 relative m-auto flex flex-col items-center w-full max-w-2xl pt-[550px]'>
                <div
                  id='textforline'
                  className='animate4 opacity-0 text-center text-white text-lg md:text-2xl font-light mb-8'
                >
                  A dedicated space where concept design, visual storytelling
                  and technology merge to express essence, feelings and
                  dimensions.
                </div>
              </div>
            </div>
          </main>
          {/* Second Image */}
          <Image
            src='/photos/aigeneration/palm1.png'
            alt='AI Generation Background'
            id='background'
            fill
            priority
            className='object-cover object-center scale-100 opacity-0'
            quality={100}
            onLoad={handleBackgroundLoad}
          />
        </div>
        <div
          id='image-container'
          className='w-full h-screen absolute top-0 left-0 right-0 z-[2] perspective-[500px] overflow-hidden'
        >
          <Image
            src='/photos/aigeneration/blackhole.webp'
            className='w-full h-full object-cover object-center'
            id='blackhole'
            alt='Black Hole'
            width={1500}
            height={1500}
            priority
            quality={100}
          />

          {/* Loading indicator */}
          <div
            id='loading-indicator'
            className='absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg opacity-70'
          >
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
              <div
                className='w-2 h-2 bg-white rounded-full animate-pulse'
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className='w-2 h-2 bg-white rounded-full animate-pulse'
                style={{ animationDelay: '0.4s' }}
              ></div>
              <span className='text-gray-200 ml-2'>Loading Experience</span>
            </div>
          </div>
        </div>
      </div>
      {/* Palm Tree */}
      <div className='relative h-screen w-full'>
        <Image
          src='/photos/aigeneration/palm2.png'
          alt='AI Generation Background'
          fill
          priority
          className='object-cover object-center scale-100'
          quality={100}
        />
      </div>
      <div id='video-wrapper' className='relative'>
        {/* FirstVideo Section */}
        <section className='first-vd-wrapper relative'>
          <div className='h-screen overflow-hidden '>
            <video
              ref={videoRef}
              muted
              playsInline
              preload='auto'
              crossOrigin='anonymous'
              src='/videos/animation2-video.mp4'
              className='first-vd w-full h-full object-cover will-change-transform'
            />
          </div>
        </section>
      </div>
      <div>
        <section className='jason relative z-10 lg:ps-40 2xl:ps-80 ps-10 py-40 mt-60 flex lg:flex-row flex-col justify-between gap-5 w-dvw overflow-x-hidden'>
          <div className='max-w-lg jason-content'>
            <h1 className='leading-[1] font-long uppercase text-8xl mb-20'>
              Creative Studio<span className='text-lg text-gray-200'>(AI)</span>
            </h1>
            <h2 className=' leading-[1] md:text-5xl text-3xl mb-7 md:pe-20 pe-10'>
              Future-ready visuals, generated through advanced AI workflows and
              directed by human intuition.
            </h2>
            <p className='text-gray-200 font-light md:text-2xl text-lg md:pe-28 pe-14'>
              Let's transform raw ideas into immersive stories that captivate
              and convert.
            </p>

            <div className='bg-yellow h-[90vh] w-auto md:mt-36 mt-20 -translate-x-5'>
              <img
                src='/photos/aigeneration/photo1.png'
                className='size-full object-cover [object-position:80%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out'
              />
            </div>
          </div>

          <div className='space-y-5 mt-96 img-box'>
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
      </div>

      {/* Second Video Section */}
      <div id='second-video-wrapper' className='relative'>
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

      <section className='lucia-life relative z-10 lg:pe-40 2xl:pe-80 pe-10 pt-40 mt-60 flex lg:flex-row-reverse flex-col justify-between gap-5 w-dvw overflow-x-hidden'>
        <div className='max-w-lg lucia-content pl-10'>
          <h1 className='leading-[1] font-long uppercase text-8xl mb-20'>
            Visual Design<span className='text-lg text-gray-200'>+(AI)</span>
          </h1>
          <h2 className=' leading-[1] md:text-5xl text-3xl mb-7 md:pe-20 pe-10'>
            For visionary brands, marketing teams, and founders ready to explore
            generative design.
          </h2>
          <p className='text-gray-200 font-light md:text-2xl text-lg md:pe-28 pe-14'>
            Algorithms don’t replace imagination — they amplify it. I fuse
            intuitive design with generative AI to craft visuals that make
            audiences look twice.
          </p>

          <div className='bg-yellow h-[90vh] w-auto md:mt-36 mt-20 translate-x-5'>
            <img
              src='/photos/aigeneration/photo2.png'
              className='size-full object-cover [object-position:20%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out'
            />
          </div>
        </div>

        <div className='space-y-5 mt-96 img-box'>
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
        <div className='calltoaction   pb-14 pt-14 flex justify-center my-60'>
          <h1 className=' gap-6'>
            <div onClick={handleCtaClick}>
              <span className='text-6xl underline hover:opacity-30 duration-150 hover:cursor-pointer text-gray-30000'>
                {' '}
                Get in touch ↵
              </span>
            </div>

            <div></div>
          </h1>
          {/* Vertical line positioned behind everything */}
          {/*  <div
            className='relative animate5 vertical-line  left-1/2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent pointer-events-none'
            style={{
              height: '1500px',
              zIndex: 0,
            }}
          /> */}
        </div>
      </section>

      {/* Infinite Scroll Component */}
      <InfiniteScroll
        fetchImages={fetchImages}
        imagesPerPage={12}
        gridId='ai-studio-grid'
        gridConfig={{
          columns: 'repeat(8, 12.5vw)',
          rows: '12.5vw',
          width: '100vw',
        }}
        enableVelocitySkew={true}
        enableParallax={true}
      />
    </section>
  );
}
