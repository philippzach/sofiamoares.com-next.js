import Link from 'next/link';

export default function NextPrev({ posts }) {
  return (
    <nav className='text-stone-300 font-[700] flex justify-between text-3xl md:text-4xl leading-[0.9] lg:text-6xl max-w-[100vw] overflow-x-hidden pt-36 pb-24'>
      <div>
        <div className=''>Prev:</div>
        <div className='uppercase underline hover:text-stone-600 whitespace-normal tracking-tight  duration-150'>
          <Link href={`/work/${posts[0].slug}`} className=''>
            {posts[0].title}
          </Link>
        </div>
      </div>
      <div>
        <div className=''>Next:</div>
        <div className='uppercase underline hover:text-stone-600 whitespace-normal tracking-tight  duration-150'>
          <Link href={`/work/${posts[1].slug}`} className=''>
            {posts[1].title}
          </Link>
        </div>
      </div>
    </nav>
  );
}
