import Image from 'next/image';
import { toNextMetadata } from 'react-datocms';
import Link from 'next/link';

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

  return {
    ...toNextMetadata([...site.favicon, ...blog.seo]),
    title: 'The Seed, Complete Brand Identity in One Week. Sofia Moraes',
    description: "One session. A complete visual world in One week. Identity, imagery direction, and a content library built from your brand's essence.",
  };
}

export default async function WebDesignPage() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const images = [
    'service1.png',
    'service2.png',
    'service3.png',
    'service4.png',
    'service5.png',
    'serviceEvita9.jpg',
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Layout - Single Column */}
      <div className='md:hidden'>
        <div className='p-8 pt-24 pb-12 text-prim-grey'>
          <h1 className='text-4xl font-bold mb-4'>The Seed</h1>

          <p className='text-lg font-semibold'>
            Type: One-time project
          </p>
          <p className='text-lg font-semibold mb-6'>$1,500 · 1 week</p>

          <Link
            href='/studio#contact'
            className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Start your project ↵
          </Link>

          <p className='text-lg mb-6'>
            You have a brand with a soul. It just doesn&apos;t look like it yet. The
            Seed is a complete visual brand system built from a single
            creative session. I extract the essence of what your brand feels,
            believes and stands for, and translate it into a full visual language:
            identity, colour, typography, imagery direction, and a content seed
            library you can use for months.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ What you receive:</p>
            <ul className='text-base space-y-1 ml-4'>
              <li>• Brand Soul Session (90-min discovery call)</li>
              <li>• Visual identity system (logo, colour, type, texture)</li>
              <li>• Imagery direction + 30 AI-generated brand visuals</li>
              <li>• Content seed library (30+ assets ready to deploy)</li>
              <li>• Brand identity guidelines</li>
              <li>• PDF brand guide</li>
            </ul>
          </div>

          <div className='mb-6'>
            <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
            <p className='text-base'>
              Founders with a product, a mission and a story, but no visual
              identity that matches it yet. New brands, small product
              companies, hotels and retreats.
            </p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
            <p className='text-base'>
              Custom Animation, Banner Video, Copywriting
            </p>
          </div>

          <p className='text-base mb-4'>
            Tell me what you&apos;re building and I&apos;ll come back with how
            I&apos;d find its seed.
          </p>
          <Link
            href='/studio#contact'
            className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Start your project ↵
          </Link>
        </div>

        {/* Mobile Images Grid */}
        <div className='grid grid-cols-1 gap-4 p-8'>
          {images.map((image, index) => (
            <div key={index} className='relative'>
              {index === 0 ? (
                <div className='w-full'>
                  <Image
                    src={`/photos/webdesign/${image}`}
                    alt={`Web Design Example ${index + 1}`}
                    width={800}
                    height={1200}
                    className='object-cover rounded-lg w-full h-auto'
                    sizes='100vw'
                  />
                </div>
              ) : (
                <div className='aspect-square'>
                  <Image
                    src={`/photos/webdesign/${image}`}
                    alt={`Web Design Example ${index + 1}`}
                    fill
                    className='object-cover rounded-lg'
                    sizes='100vw'
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Two Columns */}
      <div className='hidden md:flex'>
        {/* Left Side - Scrollable Images */}
        <div className='w-1/2'>
          <div className='grid grid-cols-1 gap-4 p-8 pt-24'>
            {images.map((image, index) => (
              <div key={index} className='relative'>
                {index === 0 ? (
                  <div className='w-full'>
                    <Image
                      src={`/photos/webdesign/${image}`}
                      alt={`Web Design Example ${index + 1}`}
                      width={800}
                      height={1200}
                      className='object-cover rounded-lg w-full h-auto'
                      sizes='50vw'
                    />
                  </div>
                ) : (
                  <div className='aspect-square'>
                    <Image
                      src={`/photos/webdesign/${image}`}
                      alt={`Web Design Example ${index + 1}`}
                      fill
                      className='object-cover rounded-lg'
                      sizes='50vw'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sticky Content */}
        <div className='w-1/2 sticky top-0 self-start max-h-screen overflow-y-auto mb-24'>
          <div className='p-8 pt-24 text-prim-grey'>
            <h1 className='text-4xl font-bold mb-4'>The Seed</h1>

            <p className='text-lg font-semibold'>
              Type: One-time project
            </p>
            <p className='text-lg font-semibold mb-6'>$1,500 · 1 week</p>

            <Link
              href='/studio#contact'
              className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Start your project ↵
            </Link>

            <p className='text-lg mb-6'>
              You have a brand with a soul. It just doesn&apos;t look like it yet.
              The Seed is a complete visual brand system built from a single
              creative session. I extract the essence of what your brand feels,
              believes and stands for, and translate it into a full visual
              language: identity, colour, typography, imagery direction, and a
              content seed library you can use for months.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>♦ What you receive:</p>
              <ul className='text-base space-y-1 ml-4'>
                <li>• Brand Soul Session (90-min discovery call)</li>
                <li>• Visual identity system (logo, colour, type, texture)</li>
                <li>• Imagery direction + 30 AI-generated brand visuals</li>
                <li>• Content seed library (30+ assets ready to deploy)</li>
                <li>• Brand identity guidelines</li>
                <li>• PDF brand guide</li>
              </ul>
            </div>

            <div className='mb-6'>
              <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
              <p className='text-base'>
                Founders with a product, a mission and a story, but no visual
                identity that matches it yet. New brands, small product
                companies, hotels and retreats.
              </p>
            </div>

            <div className='mb-8'>
              <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
              <p className='text-base'>
                Custom Animation, Banner Video, Copywriting
              </p>
            </div>

            <p className='text-base mb-4'>
              Tell me what you&apos;re building and I&apos;ll come back with
              how I&apos;d find its seed.
            </p>
            <Link
              href='/studio#contact'
              className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Start your project ↵
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
