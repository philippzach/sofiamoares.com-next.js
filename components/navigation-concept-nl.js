'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function NavigationConcept() {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef();
  const conceptLinkRef = useRef();
  const ctaRef = useRef();
  const [isTransformed, setIsTransformed] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isActive = (href) => pathname === href;

  // Function to setup and run text animations

  // Handle click on transformed button
  const handleCtaClick = (e) => {
    e.preventDefault();
    window.location.href = '/studio'; // Replace with actual email
  };

  return (
    <header className='left-0 top-0 right-0 z-[100] select-none fixed p-3'>
      <nav ref={navRef} className='flex items-center justify-between'>
        <Link
          href='/'
          className='select-auto text-base md:text-xl font-bold tracking-tight leading-tight md:pr-8 hover:opacity-30 duration-150'
          aria-current='page'
        >
          Sofia Moraes.
        </Link>

        <div
          role='navigation'
          className='flex justify-between md:w-[50%] overflow-hidden'
        >
          <div
            className={`select-auto text-base md:text-xl font-normal tracking-tight underline cursor-pointer hover:opacity-30 duration-150 ml-auto `}
            onClick={handleCtaClick}
          >
            <span>Get in touch ↵ </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
