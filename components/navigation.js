'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ isBlack }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  const textColor = isBlack ? 'text-white' : '';

  return (
    <header className=' left-0 top-0 right-0 z-[100] select-none fixed p-3'>
      <nav className='flex items-center justify-between '>
        <Link
          href='/'
          className={`text-xl font-bold tracking-tighter leading-tight md:pr-8 hover:opacity-30 duration-150
          ${textColor}`}
          aria-current='page'
        >
          Sofia Moraes.
        </Link>
        <div role='navigation' className='flex justify-between w-[40%]'>
          <ul className='flex flex-wrap m-0 p-0 '>
            <li>
              <Link
                href='/work'
                className={`text-xl font-bold mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/work') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Work,
              </Link>
            </li>
            <li>
              <Link
                href='/studio'
                className={`text-xl font-bold hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/studio') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Studio
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
