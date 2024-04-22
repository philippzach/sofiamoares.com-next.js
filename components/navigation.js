import Link from 'next/link';

export default function Navigation() {
  return (
    <header className='left-0 top-0 right-0 z-[100] select-none fixed p-3'>
      <div className='flex items-center justify-between'>
        <Link
          href='/'
          className='text-xl font-bold tracking-tighter leading-tight md:pr-8 hover:opacity-30 duration-150'
          aria-current='page'
        >
          Sofia Moræs.
        </Link>
        <div role='navigation' className='flex justify-between w-[40%]'>
          <ul className='flex flex-wrap m-0 p-0 '>
            <li>
              <Link
                href='/work'
                className='text-xl font-bold mr-2 hover:opacity-30 duration-150'
              >
                Work,
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='text-xl font-bold hover:opacity-30 duration-150'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
