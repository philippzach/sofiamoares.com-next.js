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
  const setupTextAnimations = () => {
    if (hasAnimated) return;

    // Get all navigation items including the concept link
    const navItems = document.querySelectorAll('.nav-hide-item, #concept-link');

    // Reset any existing animations
    navItems.forEach((item) => {
      if (item.anim) {
        item.anim.progress(1).kill();
      }
      if (item.split) {
        item.split.revert();
      }
    });

    // Create splits and animations for each navigation item
    navItems.forEach((item, index) => {
      // Create split text
      item.split = new SplitText(item, {
        type: 'words',
      });

      // Set initial state
      gsap.set(item.split.words, {
        yPercent: 0,
        opacity: 1,
      });

      // Create timeline for this item
      const tl = gsap.timeline({
        delay: 0.5 + index * 0.1,
        onComplete: () => {
          if (index === navItems.length - 1) {
            setIsTransformed(true);
            setHasAnimated(true);
            // Start CTA animation after last item exits
            animateCTA();
          }
        },
      });

      // Exit animations
      tl.addLabel('exit');

      // Position animation for exit
      tl.staggerFromTo(
        item.split.words,
        0.4,
        {
          yPercent: 0,
        },
        {
          yPercent: 200,
          ease: 'Circ.easeIn',
        },
        0.1,
        'exit'
      );

      // Opacity animation for exit
      tl.staggerFromTo(
        item.split.words,
        0.4,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          ease: 'Power1.easeIn',
        },
        0.1,
        'exit'
      );

      // Store the timeline on the item for cleanup
      item.anim = tl;
    });
  };

  // Function to animate the CTA
  const animateCTA = () => {
    const cta = ctaRef.current;
    if (!cta) return;

    // Set initial state
    gsap.set(cta, {
      yPercent: 200,
      opacity: 0,
    });

    // Create and play animation
    const tl = gsap.timeline({
      delay: 0.2,
    });

    tl.fromTo(
      cta,
      {
        yPercent: 200,
        opacity: 0,
      },
      {
        duration: 0.8,
        yPercent: 0,
        opacity: 1,
        ease: 'Circ.easeOut',
      }
    );
  };

  // Function to handle cleanup
  const cleanupAnimations = () => {
    const navItems = document.querySelectorAll('.nav-hide-item, #concept-link');
    navItems.forEach((item) => {
      if (item.anim) {
        item.anim.kill();
      }
      if (item.split) {
        item.split.revert();
      }
    });
  };

  // Function to trigger the animation
  const transformConceptLink = () => {
    cleanupAnimations();
    setupTextAnimations();
  };

  // Start animation with a delay when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      transformConceptLink();
    }, 1);
    return () => {
      clearTimeout(timer);
      cleanupAnimations();
    };
  }, []);

  // Handle click on transformed button
  const handleCtaClick = (e) => {
    if (isTransformed) {
      e.preventDefault();
      window.location.href = '/studio';
    }
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
          <ul
            className={`flex flex-wrap m-0 p-0 ${
              isTransformed ? 'hidden' : ''
            }`}
          >
            <li className='overflow-hidden'>
              <Link
                href='/work'
                className={`select-auto nav-hide-item text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/work') ? 'opacity-30' : ''}`}
              >
                Work,
              </Link>
            </li>
            <li className='overflow-hidden'>
              <Link
                href='/services'
                className={`select-auto nav-hide-item text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/services') ? 'opacity-30' : ''}`}
              >
                Services,
              </Link>
            </li>
            <li className='overflow-hidden'>
              <Link
                href='/studio'
                className={`select-auto nav-hide-item text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/studio') ? 'opacity-30' : ''}`}
              >
                Studio,
              </Link>
            </li>
            <li className='overflow-hidden relative'>
              <Link
                href='/concept'
                ref={conceptLinkRef}
                id='concept-link'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/concept') ? 'opacity-30' : ''}`}
              >
                Concept ↵
              </Link>
            </li>
          </ul>
          <div
            ref={ctaRef}
            className={`select-auto text-base md:text-xl font-normal tracking-tight underline cursor-pointer hover:opacity-30 duration-150 ml-auto ${
              !isTransformed ? 'hidden' : ''
            }`}
            onClick={handleCtaClick}
          >
            <span>Get in touch ↵ </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
