'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ data }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <nav className='flex items-center justify-between '>
      <div role='navigation' className='flex justify-between '>
        <ul className='flex flex-wrap m-0 p-0 '>
          <li>
            <Link
              href='/archive'
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mr-3 text-stone-300 hover:text-stone-700 duration-150
                                ${isActive('/archive') ? 'text-stone-700' : ''}
                                
                                `}
            >
              All,{' '}
            </Link>
          </li>
          {data.allCategories.map((category, index, array) => {
            if (
              category.slug === 'graphic-identity' ||
              category.slug === 'creative-direction' ||
              category.slug === 'strategy' ||
              category.slug === 'digital-design' ||
              category.slug === 'print'
            ) {
              return (
                <li key={category.slug}>
                  <Link
                    href={`/archive/${category.slug}`}
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mr-3 text-stone-300 hover:text-stone-700 duration-150
                      ${
                        isActive(`/archive/${category.slug}`)
                          ? 'text-stone-700'
                          : ''
                      }
                      `}
                  >
                    {category.name}
                    {index === array.length - 1 ? '.' : ','}
                  </Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </nav>
  );
}
