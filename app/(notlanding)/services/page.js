import Link from 'next/link';
import Image from 'next/image';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment } from '@/lib/fragments';

const PAGE_CONTENT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    blog {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    
  }

  ${metaTagsFragment}
  
`;

function getPageRequest() {
  return { query: PAGE_CONTENT_QUERY };
}

export async function generateMetadata() {
  const { site, blog } = await performRequest(getPageRequest());

  return toNextMetadata([...site.favicon, ...blog.seo]);
}

export default async function ServicesLanding() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  return (
    <div className='min-h-screen bg-white mt-10 py-8'>
      {/* Intro Section */}
      <div className='w-full md:w-1/2  mb-10 md:mb-16 text-left text-prim-grey'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4 leading-[1]'>
          You’re Building Something Big ✴<br /> Your Design Should Match That
          Energy.
        </h1>
        <p className='text-3xl font-light leading-[1]'>
          Soulful brand systems, cinematic visuals, and digital experiences that
          feel and convert. I help you build strategic design solutions that
          shape your ambitious ideas into aesthetic, market-ready brands.
        </p>
      </div>
      {/* Services Grid */}
      <div className='w-full flex flex-col gap-8'>
        {/* Brand Identity */}
        <Link
          href='/services/brandidentity'
          className='group/link block w-full'
        >
          <div className='flex flex-col md:flex-row w-full'>
            <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
              <Image
                src='/photos/brandidentity/logo2.webp'
                alt='Brand Identity Logo 1'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <Image
                src='/photos/brandidentity/logo1.webp'
                alt='Brand Identity Logo 2'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
            <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
              <h2 className='text-4xl font-bold text-prim-grey group-hover/link:text-stone-300 transition-colors duration-200 mb-2'>
                Brand Identity
              </h2>
              <p className='text-gray-500'>Visual Design • Brand assets</p>
            </div>
          </div>
        </Link>
        {/* Web/App Design */}
        <Link href='/services/webdesign' className='group/link block w-full'>
          <div className='flex flex-col md:flex-row w-full'>
            <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
              <Image
                src='/photos/webdesign/web1.jpg'
                alt='Web/App Design 1'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <Image
                src='/photos/webdesign/web2.jpg'
                alt='Web/App Design 2'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
            <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
              <h2 className='text-4xl font-bold text-prim-grey group-hover/link:text-stone-300 transition-colors duration-200 mb-4'>
                Digital Experiences
              </h2>
              <p className='text-gray-500'>
                Websites and apps designed to convert visitors into customers,
                built for performance and growth.
              </p>
            </div>
          </div>
        </Link>
        {/* Creative Direction */}
        <Link
          href='/services/creativedirection'
          className='group/link block w-full'
        >
          <div className='flex flex-col md:flex-row w-full'>
            <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
              <Image
                src='/photos/creativedirection/cd1.jpg'
                alt='Creative Direction 1'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <Image
                src='/photos/creativedirection/cd2.jpg'
                alt='Creative Direction 2'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
            <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
              <h2 className='text-4xl font-bold text-prim-grey group-hover/link:text-stone-300 transition-colors duration-200 mb-2'>
                Creative Direction
              </h2>
              <p className='text-gray-500'>
                Vision, storytelling, and campaign leadership for brands that
                want to stand out.
              </p>
            </div>
          </div>
        </Link>
        {/* AI Creative */}
        <Link href='/services/aicreative' className='group/link block w-full'>
          <div className='flex flex-col md:flex-row w-full'>
            <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
              <Image
                src='/photos/aiservices/ai1.webp'
                alt='Creative Direction 1'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <Image
                src='/photos/aiservices/aiservice2.webp'
                alt='Creative Direction 2'
                fill
                className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
            <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
              <h2 className='text-4xl font-bold text-prim-grey group-hover/link:text-stone-300 transition-colors duration-200 mb-4'>
                AI-Enhanced Creative
              </h2>
              <p className='text-gray-500'>
                Cutting-edge creative solutions amplified by generative AI
                workflows deliver impossible-to-ignore visuals.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
