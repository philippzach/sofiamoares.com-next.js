'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Modal from './Modal';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Add styles for initial state
const gridImageStyle = {
  opacity: 0,
  transform: 'translateY(50px) scale(0.9)',
};

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

export default function InfiniteScroll({
  fetchImages,
  imagesPerPage = 12,
  gridId = 'gridtemplate',
  gridConfig = {
    columns: 'repeat(8, 12.5vw)',
    rows: '12.5vw',
    width: '100vw',
  },
  className = '',
  containerClassName = '',
  enableVelocitySkew = true,
  enableParallax = true,
}) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load initial images
  useEffect(() => {
    loadMoreImages();
  }, []);

  // Function to fetch more images
  const loadMoreImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newImages = await fetchImages(page, imagesPerPage);

      if (newImages.length < imagesPerPage) {
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
    // Velocity-based skew animation
    if (enableVelocitySkew) {
      let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter('.grid-image', 'skewY', 'deg'),
        clamp = gsap.utils.clamp(-20, 20);

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
    }

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
    const gridContainer = document.getElementById(gridId);
    if (gridContainer) {
      observer.observe(gridContainer, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [enableVelocitySkew, gridId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div
        className={`w-screen px-0 mt-6 relative ${containerClassName}`}
        style={{ maxWidth: '100vw' }}
      >
        {/* Photo Gallery Grid */}
        <div
          id={gridId}
          className={`relative pb-96 ${className}`}
          style={{
            width: gridConfig.width,
          }}
        >
          <div
            className='grid relative'
            style={{
              display: 'grid',
              gridTemplateColumns: gridConfig.columns,
              gridAutoRows: gridConfig.rows,
              width: gridConfig.width,
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
                  onClick={() => handleImageClick(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes='(max-width: 768px) 100vw, 50vw'
                    className='object-cover rounded-lg hover:opacity-100 hover:cursor-pointer hover:scale-[1.01] transition-transform duration-300'
                    loading='lazy'
                    quality={75}
                  />
                </div>
              );
            })}

            {loading && (
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
            )}

            {error && (
              <div className='col-span-full text-center text-red-500 py-4'>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </>
  );
}
