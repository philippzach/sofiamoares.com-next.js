'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import NavigationConcept from '@/components/navigation-concept-nl';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { getPaginatedImages } from '@/lib/image-data';

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger, Flip, SplitText);

// Add styles for initial state
const gridImageStyle = {
  opacity: 0,
  transform: 'translateY(50px) scale(0.9)',
};

// Add styles to prevent flash of content
const initialStyles = `
  .animate1, .animate4, .animate5 {
    opacity: 0;
  }
  .animate2 {
    visibility: hidden;
  }
`;

// Example grid structure for placeholders (matching the reference image)

// Custom hook for infinite scroll
const useInfiniteScroll = (callback) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [callback]
  );

  return lastElementRef;
};

export default function Page() {
  const containerRef = useRef();
  const smootherRef = useRef();
  const headlineRef = useRef();
  const maskRef = useRef();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const IMAGES_PER_PAGE = 12;

  // Load initial images
  useEffect(() => {
    loadMoreImages();
  }, []);

  // Function to fetch more images
  const loadMoreImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newImages = await fetchImages(page, IMAGES_PER_PAGE);

      if (newImages.length < IMAGES_PER_PAGE) {
        setHasMore(false);
      }

      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
    } catch (error) {
      setError('Failed to load images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const lastImageRef = useInfiniteScroll(loadMoreImages);

  useGSAP(() => {
    // Create timeline for sequential animations
    const tl = gsap.timeline();

    // Remove visibility: hidden before splitting text
    gsap.set('.animate2', {
      visibility: 'visible',
    });

    // Split text into lines
    const text1 = new SplitText('.animate1', {
      type: 'lines',
      linesClass: 'split-line',
    });
    const text2 = new SplitText('.animate2', { type: 'lines' });
    const text4 = new SplitText('.animate4', {
      type: 'lines',
      linesClass: 'split-line',
    });

    // Wrap only animate2 lines for masking effect
    text2.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      gsap.set(line, { yPercent: 100 });
    });

    // Create sequential animations
    tl.to('.animate1', {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.in',
    })
      .to(
        text2.lines,
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.25,
          ease: 'circ.out',
        },
        '+=0.1'
      )
      .to(
        ['.animate4', '.animate5'],
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power1.out',
          onComplete: () => {
            // Dispatch event to trigger navigation animation
            window.dispatchEvent(
              new CustomEvent('concept-animation', {
                detail: { type: 'concept-animation-complete' },
              })
            );
          },
        },
        '>'
      );

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    // Pin the headline and create mask reveal effect
    ScrollTrigger.create({
      trigger: '.headline-container',
      start: 'top top',
      end: '+=40%', // Adjust this value to control how long the effect lasts
      pin: true,
      pinSpacing: false,
      onUpdate: (self) => {
        // Update mask height based on scroll progress
        const progress = self.progress;
        gsap.set(maskRef.current, {
          backgroundImage: `linear-gradient(360deg,
            rgba(26, 26, 26, 1) 0%,
            rgba(26, 26, 26, 0.2) ${Math.max(0, 50 - progress * 50)}%,
            rgba(26, 26, 26, 0) ${Math.max(0, 100 - progress * 100)}%
          )`,
        });
      },
    });

    // Parallax effect for the vertical line
    gsap.to('.vertical-line', {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.vertical-line',
        start: 'bottom top',
        end: 'top bottom ',
        scrub: true,
      },
    });

    // Create a proxy for skew animation
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter('.grid-image', 'skewY', 'deg'),
      clamp = gsap.utils.clamp(-20, 20);

    // Velocity-based skew animation
    ScrollTrigger.create({
      onUpdate: (self) => {
        let velocity = clamp(Math.round(self.getVelocity() / -300));
        if (Math.abs(velocity) > 0) {
          proxy.skew = velocity;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    // Function to set up grid image animations
    const setupGridImageAnimation = (image) => {
      const imageAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          scrub: true,
        },
      });

      imageAnimation.fromTo(
        image,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );
    };

    // Set up initial animations
    const gridImages = gsap.utils.toArray('.grid-image');
    gridImages.forEach(setupGridImageAnimation);

    // Create a mutation observer to handle dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('grid-image')) {
            setupGridImageAnimation(node);
          }
        });
      });
    });

    // Start observing the grid container for changes
    observer.observe(document.getElementById('gridtemplate'), {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Add style tag to head */}
      <style>{initialStyles}</style>
      <div className='min-h-screen relative overflow-x-hidden flex flex-col items-center'>
        <NavigationConcept />
        <section id='wrapper'>
          <div id='content'>
            <main className='flex flex-col items-center pt-24 pb-10 px-2 md:px-0 max-w-5xl mx-auto w-full relative'>
              {/* Header */}
              <div className='animate1 text-center mb-6 text-lg md:text-xl font-secondary text-white/80 mt-12'>
                Welcome to my inner studio
              </div>

              {/* Pinned Headline Container */}
              <div className='headline-container w-full relative z-10'>
                <div ref={headlineRef} className='relative'>
                  <h1 className='animate2 text-center font-bold text-[2.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] tracking-tight mb-4 font-sans'>
                    IMAGINING
                    <br />
                    NEW REALITIES
                  </h1>
                  {/* Mask overlay */}
                  <div
                    ref={maskRef}
                    className='absolute inset-0 pointer-events-none'
                    style={{
                      backgroundImage:
                        'linear-gradient(360deg, rgba(26, 26, 26, 1) 0%, rgba(26, 26, 26, 0.2) 50%, rgba(26, 26, 26, 0) 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Container for text */}
              <div className='relative flex flex-col items-center w-full max-w-2xl pt-[350px]'>
                <div
                  id='textforline'
                  className='animate4 text-center text-white text-lg md:text-2xl font-light mb-8'
                >
                  A dedicated space where concept design, visual storytelling
                  and technology merge to express essence, feelings and
                  dimensions.
                </div>
              </div>
            </main>

            <div
              className='w-screen px-0 mt-6 relative '
              style={{ maxWidth: '100vw' }}
            >
              {/* Vertical line positioned behind everything */}
              <div
                className='animate5 vertical-line absolute left-1/2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent pointer-events-none'
                style={{
                  top: '-1.50%',
                  height: '1500px',
                  zIndex: 0,
                }}
              />
              {/* Photo Gallery Grid */}
              <div
                id='gridtemplate'
                className='relative pb-96'
                style={{
                  width: '100vw',
                }}
              >
                <div
                  className='grid relative'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 12.5vw)',
                    gridAutoRows: '12.5vw',
                    width: '100vw',
                    zIndex: 1,
                  }}
                >
                  {images.map((image, index) => {
                    const isLastElement = index === images.length - 1;

                    return (
                      <div
                        ref={isLastElement ? lastImageRef : null}
                        key={image.id}
                        data-speed={image.dataSpeed}
                        className='grid-image relative'
                        style={{
                          ...gridImageStyle,
                          gridColumn: image.gridColumn,
                          gridRow: image.gridRow,
                          aspectRatio: image.aspectRatio,
                          minHeight: '200px',
                        }}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes='(max-width: 768px) 100vw, 50vw'
                          className='object-cover rounded-lg'
                          loading='lazy'
                          quality={75}
                        />
                      </div>
                    );
                  })}

                  {loading && (
                    <div className='col-span-full flex justify-center py-4'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
                    </div>
                  )}

                  {error && (
                    <div className='col-span-full text-center text-red-500 py-4'>
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
// Helper function to fetch images
async function fetchImages(page, limit) {
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
}
