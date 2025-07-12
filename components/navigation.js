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
          className={`select-auto text-base md:text-xl font-bold tracking-tight leading-tight md:pr-8 hover:opacity-30 duration-150
          ${textColor}`}
          aria-current='page'
        >
          Sofia Moraes.
        </Link>
        <div role='navigation' className='flex justify-between md:w-[45%]'>
          <ul className='flex flex-wrap m-0 p-0 '>
            <li>
              <Link
                href='/work'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/work') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Work,
              </Link>
            </li>
            <li>
              <Link
                href='/services'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/studio') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Services,
              </Link>
            </li>
            <li>
              <Link
                href='/studio'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/studio') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Studio,
              </Link>
            </li>
            <li>
              <Link
                href='/concept'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:underline hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/concept/aicreativestudio') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Concept ↵
              </Link>
            </li>
            {/* <li>
              <Link
                href='/concept'
                target='_blank'
                rel='noopener noreferrer'
                className={`text-base md:text-xl font-bold tracking-tight hover:opacity-30 md:hover:after:content-['_↳'] hover:underline active:opacity-30 duration-150
                ${isActive('/studio') ? 'opacity-30' : ''}
                ${textColor}
                `}
              >
                Concept
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}
