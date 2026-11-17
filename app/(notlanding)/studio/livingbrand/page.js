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
    title: 'The Living Brand, Monthly Creative Direction. Sofia Moraes',
    description: 'One creative session a month. Up to 12 months of campaign visuals, social assets, and creative direction always on brand.',
  };
}

export default async function CreativeDirectionPage() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const images = [
    'livingbrand1.jpg',
    'livingbrand2.jpg',
    'livingbrand4.jpg',
    'livingbrand5.jpg',
    'livingbrand6.png',
    'livingbrand8.png',
    'livingbrand3.jpg',
    'livingbrand9.png',
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Layout - Single Column */}
      <div className='md:hidden'>
        <div className='p-8 pt-24 pb-12 text-prim-grey'>
          <h1 className='text-4xl font-bold mb-4'>The Living Brand</h1>

          <p className='text-lg font-semibold mb-6'>
            Type: Monthly retainer · From $1,200 / month · Commitment: 3 months
            minimum
          </p>

          <Link
            href='/studio#contact'
            className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Start your project ↵
          </Link>

          <p className='text-lg mb-6'>
            You have the world. Now it has to keep speaking. Once a month we
            meet, I pull a new seed from where the brand actually is, and I
            build everything that comes from it.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ What you receive each month:</p>
            <ul className='text-base space-y-1 ml-4'>
              <li>• One creative session a month</li>
              <li>• 60–80 campaign-quality visuals</li>
              <li>
                • Social content grid: captions and imagery, ready to post
              </li>
              <li>• Reel and story direction, filmed or generated</li>
              <li>
                • Website updates: new pages, campaigns, seasonal shifts
              </li>
              <li>
                • I run your AI direction system so everything stays on brand
              </li>
              <li>• Creative evolution report</li>
            </ul>
          </div>

          <div className='mb-6'>
            <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
            <p className='text-base'>
              Brands that have launched and need to keep producing at the level
              they launched with. Founders who don&apos;t want to burn out making
              content.
            </p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
            <p className='text-base'>
              Product Photography, Video, AI Enhanced Brand Art
            </p>
          </div>

          <p className='text-base mb-4'>
            Tell me where your brand is now and I&apos;ll come back with what
            the first month would look like.
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
            <div key={index} className='relative aspect-square'>
              <Image
                src={`/photos/creativedirection/${image}`}
                alt={`Living Brand Example ${index + 1}`}
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
                  alt={`Living Brand Example ${index + 1}`}
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
              Type: Monthly retainer · From $1,200 / month · Commitment: 3
              months minimum
            </p>

            <Link
              href='/studio#contact'
              className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Start your project ↵
            </Link>

            <p className='text-lg mb-6'>
              You have the world. Now it has to keep speaking. Once a month we
              meet, I pull a new seed from where the brand actually is, and I
              build everything that comes from it.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>
                ♦ What you receive each month:
              </p>
              <ul className='text-base space-y-1 ml-4'>
                <li>• One creative session a month</li>
                <li>• 60–80 campaign-quality visuals</li>
                <li>
                  • Social content grid: captions and imagery, ready to post
                </li>
                <li>• Reel and story direction, filmed or generated</li>
                <li>
                  • Website updates: new pages, campaigns, seasonal shifts
                </li>
                <li>
                  • I run your AI direction system so everything stays on brand
                </li>
                <li>• Creative evolution report</li>
              </ul>
            </div>

            <div className='mb-6'>
              <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
              <p className='text-base'>
                Brands that have launched and need to keep producing at the
                level they launched with. Founders who don&apos;t want to burn
                out making content.
              </p>
            </div>

            <div className='mb-8'>
              <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
              <p className='text-base'>
                Product Photography, Video, AI Enhanced Brand Art
              </p>
            </div>

            <p className='text-base mb-4'>
              Tell me where your brand is now and I&apos;ll come back with
              what the first month would look like.
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
