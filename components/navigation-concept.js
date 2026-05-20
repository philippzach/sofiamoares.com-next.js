'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationConcept() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <header className='left-0 top-0 right-0 z-[100] select-none fixed p-3'>
      <nav className='flex items-center justify-between'>
        <Link
          href='/'
          className='select-auto text-base md:text-xl font-bold tracking-tight leading-tight md:pr-8 hover:opacity-30 duration-150'
          style={{ color: '#f5f5f5' }}
          aria-current='page'
        >
          Sofia Moraes.
        </Link>

        <div role='navigation' className='flex justify-between md:w-[50%]'>
          <ul className='flex flex-wrap m-0 p-0'>
            <li>
              <Link
                href='/work'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/work') ? 'opacity-30' : ''}`}
                style={{ color: '#f5f5f5' }}
              >
                Work,
              </Link>
            </li>
            <li>
              <Link
                href='/studio'
                className={`select-auto text-base md:text-xl font-bold tracking-tight mr-2 hover:opacity-30 active:opacity-30 duration-150
                ${isActive('/studio') ? 'opacity-30' : ''}`}
                style={{ color: '#f5f5f5' }}
              >
                Studio,
              </Link>
            </li>
          </ul>
          <Link
            href='/studio#contact'
            className='select-auto text-base md:text-xl font-normal tracking-tight underline hover:opacity-30 duration-150 ml-auto'
            style={{ color: '#f5f5f5' }}
          >
            Get in touch ↵
          </Link>
        </div>
      </nav>
    </header>
  );
}
