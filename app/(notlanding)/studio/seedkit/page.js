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

  return toNextMetadata([...site.favicon, ...blog.seo]);
}

export default async function WebDesignPage() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  console.log(data);

  const images = ['weblanding.jpg', 'web1.jpg', 'web2.jpg', 'web3.jpg'];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Layout - Single Column */}
      <div className='md:hidden'>
        <div className='p-8 pt-24 pb-12 text-prim-grey'>
          <h1 className='text-4xl font-bold mb-4'>The Seed Kit</h1>

          <p className='text-lg font-semibold mb-6'>
            Type: One-time project. Delivery: 2 weeks
          </p>

          <p className='text-lg mb-6'>
            You have a brand with a soul. It just doesn't look like it yet. The
            Seed Kit is a complete visual brand system built from a single
            creative session. I extract the essence — what your brand feels,
            believes, stands for — and translate it into a full visual language:
            identity, colour, typography, imagery direction, and a content seed
            library you can use for months.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ What you receive:</p>
            <ul className='text-base space-y-1 ml-4'>
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
              New entrepreneurs, products, companies, or hotels and retreats who
              need a clean, elevated web presence without the complexity.
            </p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
            <p className='text-base'>
              Custom Animation, Banner Video, Copywriting
            </p>
          </div>

          <Link
            href='/studio'
            className=' inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Reach out now ↵
          </Link>
          <div className='mb-8'>
            <p className='text-base mb-4'>
              Are you in? let&apos;s connect. A short call helps us get to know
              each other and see how I can support your vision.
            </p>
          </div>
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
        <div className='w-1/2 sticky top-0 h-screen mb-24'>
          <div className='p-8 pt-24 text-prim-grey'>
            <h1 className='text-4xl font-bold mb-4'>The Seed Kit</h1>

            <p className='text-lg font-semibold mb-6'>
              Type: One-time project. Delivery: 2 weeks
            </p>

            <p className='text-lg mb-6'>
              You have a brand with a soul. It just doesn't look like it yet.
              The Seed Kit is a complete visual brand system built from a single
              creative session. I extract the essence — what your brand feels,
              believes, stands for — and translate it into a full visual
              language: identity, colour, typography, imagery direction, and a
              content seed library you can use for months.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>♦ What you receive:</p>
              <ul className='text-base space-y-1 ml-4'>
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
                New entrepreneurs, products, companies, or hotels and retreats
                who need a clean, elevated web presence without the complexity.
              </p>
            </div>

            <div className='mb-8'>
              <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
              <p className='text-base'>
                Custom Animation, Banner Video, Copywriting
              </p>
            </div>

            <Link
              href='/studio'
              className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Reach out now ↵
            </Link>
            <div className='mb-8'>
              <p className='text-base mb-4'>
                Are you in? let&apos;s connect. A short call helps us get to
                know each other and see how I can support your vision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
