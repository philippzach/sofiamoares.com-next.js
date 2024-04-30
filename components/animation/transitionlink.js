'use client';

import { useRouter } from 'next/navigation';
import { animatePageOut } from '@/components/animation/animations';

export default function TransitionLink({ href, label }) {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <button
      className='border-[2px] uppercase border-white p-4 rounded-xl hover:bg-white hover:text-slate-900 cursor-pointer'
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
