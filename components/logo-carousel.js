'use client';
import Image from 'next/image';
import { useRef } from 'react';

export default function LogoCarousel({ clients = [] }) {
  const scrollRef = useRef(null);

  // Helper to normalize names → e.g., "Swiss Ventures Group" → "swissventuresgroup"
  const slugify = (str = '') => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Each entry provides the logo path and a placeholder URL you can adjust later
  const logoMap = {
    campbay: {
      src: '/photos/logos/campbaylogo.png',
      url: 'https://campbaylodge.com/',
      type: 'png',
    },
    swissventuresgroup: {
      src: '/photos/logos/swiss_ventures_group.png',
      url: 'https://www.swissventuresgroup.com/', // TODO: replace with real URL
      type: 'png',
    },
    gulbenkian: {
      src: '/photos/logos/gulbenkian.webp',
      url: 'https://gulbenkian.pt/en/', // TODO: replace with real URL
      type: 'webp',
    },
    wyldr: {
      src: '/photos/logos/wyldr.png',
      url: 'https://www.wyldr-bio.de/', // TODO: replace with real URL
      type: 'png',
    },
    alphamed: {
      src: '/photos/logos/alphamed.jpg',
      url: 'https://www.alphamed-fischer.at/',
      type: 'jpg',
    },
    aktivnaturheilmittel: {
      src: '/photos/logos/aktiv-naturheilmittel.jpg',
      url: 'https://www.aktiv-naturheilmittel.de/',
      type: 'jpg',
    },
    wh: {
      src: '/photos/logos/wh-logo.png',
      url: 'https://www.wohlgensinger.ch/',
      type: 'png',
    },
    elacai: {
      src: '/photos/logos/elacailogo-big.png',
      url: '#',
      type: 'png',
    },
  };

  // We ignore incoming clients and rely exclusively on the explicit logo map
  const displayLogos = Object.values(logoMap);

  // No infinite scroll – keep simple horizontal slider

  return (
    <div className='relative'>
      {/* Navigation Buttons (hidden on small screens) */}
      <button
        type='button'
        aria-label='Scroll logos left'
        onClick={() => scrollBy(-300)}
        className='hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100'
      >
        <span className='sr-only'>Previous</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className='flex overflow-x-auto gap-8 py-2 px-2 scroll-smooth'
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Hide scrollbar for WebKit */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {displayLogos.map((logo, idx) => {
          const { src: logoSrc, url: linkHref } = logo;
          return (
            <a
              key={`logo-${idx}`}
              href={linkHref}
              target='_blank'
              rel='noreferrer noopener'
              className='flex-shrink-0 inline-block'
            >
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={`Logo ${idx}`}
                  width={160}
                  height={100}
                  className='object-contain w-40 h-24'
                  loading='lazy'
                />
              ) : (
                <span className='text-lg'>Logo</span>
              )}
            </a>
          );
        })}
      </div>

      <button
        type='button'
        aria-label='Scroll logos right'
        onClick={() => scrollBy(300)}
        className='hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100'
      >
        <span className='sr-only'>Next</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </button>
    </div>
  );
}
