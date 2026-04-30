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

export default async function CreativeDirectionPage() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const images = [
    'cd1.jpg',
    'cd2.jpg',
    'cd3.jpg',
    'cd4.jpg',
    'cd5.jpg',
    'cd6.jpg',
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Layout - Single Column */}
      <div className='md:hidden'>
        <div className='p-8 pt-24 pb-12 text-prim-grey'>
          <h1 className='text-4xl font-bold mb-4'>The Living Brand</h1>

          <p className='text-lg font-semibold mb-6'>
            Type: Monthly retainer. Commitment: 3 months minimum
          </p>

          <p className='text-lg mb-6'>
            One creative session. Up to 12 months of content. Once a month, we
            meet. I extract new seeds — a story, a texture, a feeling. I
            generate a full batch of campaign-quality visuals and creative
            direction your team can deploy across every channel. Your brand
            grows continuously. You don&apos;t burn out.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ What you receive each month:</p>
            <ul className='text-base space-y-1 ml-4'>
              <li>• 60–80 campaign-quality visual assets</li>
              <li>• Monthly campaign direction</li>
              <li>• Social content grid (captions + imagery)</li>
              <li>• Story and reel creative briefs</li>
              <li>• Creative evolution report</li>
            </ul>
          </div>

          <div className='mb-6'>
            <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
            <p className='text-base'>
              Established brands, companies or creative founders launching a new
              phase or offering — with depth, poetry, and presence.
            </p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
            <p className='text-base'>
              Product Photography, Video, AI Enhanced Brand Art
            </p>
          </div>

          <Link
            href='/studio'
            className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Text me now ↵
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
            <div key={index} className='relative aspect-square'>
              <Image
                src={`/photos/creativedirection/${image}`}
                alt={`Creative Direction Example ${index + 1}`}
                fill
                className='object-cover rounded-lg'
                sizes='100vw'
              />
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
              <div key={index} className='relative aspect-square'>
                <Image
                  src={`/photos/creativedirection/${image}`}
                  alt={`Creative Direction Example ${index + 1}`}
                  fill
                  className='object-cover rounded-lg'
                  sizes='50vw'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sticky Content */}
        <div className='w-1/2 sticky top-0 h-screen mb-24'>
          <div className='p-8 pt-24 text-prim-grey'>
            <h1 className='text-4xl font-bold mb-4'>The Living Brand</h1>

            <p className='text-lg font-semibold mb-6'>
              Type: Monthly retainer. Commitment: 3 months minimum
            </p>

            <p className='text-lg mb-6'>
              One creative session. Up to 12 months of content. Once a month, we
              meet. I extract new seeds — a story, a texture, a feeling. I
              generate a full batch of campaign-quality visuals and creative
              direction your team can deploy across every channel. Your brand
              grows continuously. You don&apos;t burn out.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>
                ♦ What you receive each month:
              </p>
              <ul className='text-base space-y-1 ml-4'>
                <li>• 60–80 campaign-quality visual assets</li>
                <li>• Monthly campaign direction</li>
                <li>• Social content grid (captions + imagery)</li>
                <li>• Story and reel creative briefs</li>
                <li>• Creative evolution report</li>
              </ul>
            </div>

            <div className='mb-6'>
              <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
              <p className='text-base'>
                Established brands, companies or creative founders launching a
                new phase or offering — with depth, poetry, and presence.
              </p>
            </div>

            <div className='mb-8'>
              <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
              <p className='text-base'>
                Product Photography, Video, AI Enhanced Brand Art
              </p>
            </div>

            <Link
              href='/studio'
              className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Text me now ↵
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
