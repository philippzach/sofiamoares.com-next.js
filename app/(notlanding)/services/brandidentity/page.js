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

export default async function BrandIdentityPage() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const images = [
    'logo1.webp',
    'logo2.webp',
    'logo3.webp',
    'logo4.webp',
    'logo5.webp',
    'logo6.webp',
    'logo7.webp',
    'logo8.webp',
    'logo9.webp',
    'logo10.webp',
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Layout - Single Column */}
      <div className='md:hidden'>
        <div className='p-8 pt-24 pb-12 text-prim-grey'>
          <h1 className='text-4xl font-bold mb-4'>Brand Identity</h1>

          <p className='text-lg font-semibold mb-6'>Starting from 750 €</p>

          <p className='text-lg mb-6'>
            A refined and minimal brand foundation — perfect for new creatives
            who want to start aligned without the extras.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ Includes:</p>
            <ul className='text-base space-y-1 ml-4'>
              <li>• 1x Brand Discovery Call</li>
              <li>• Logo Suite (primary, alt, favicon)</li>
              <li>• Color Palette + Font Pairing</li>
              <li>• 1x Moodboard (directional visual language)</li>
              <li>• Mini Brand Sheet PDF (logos, colors, fonts, usage)</li>
              <li>• Asset Export (.png, .svg, .webp)</li>
              <li>• Delivery via Notion Brand Vault</li>
            </ul>
          </div>

          <div className='mb-6'>
            <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
            <p className='text-base'>
              New entrepreneurs, products, companies, or hotels and retreats
              seeking an emotionally aligned, timeless brand foundation.
            </p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
            <p className='text-base'>
              Naming, brand story copy, AI-enhanced brand art, creative
              direction for launch
            </p>
          </div>

          <Link
            href='/studio'
            className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Let&apos;s start now ↵
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
                src={`/photos/brandidentity/${image}`}
                alt={`Brand Identity Example ${index + 1}`}
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
                  src={`/photos/brandidentity/${image}`}
                  alt={`Brand Identity Example ${index + 1}`}
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
            <h1 className='text-4xl font-bold mb-4'>Brand Identity</h1>

            <p className='text-lg font-semibold mb-6'>Starting from 750 €</p>

            <p className='text-lg mb-6'>
              A refined and minimal brand foundation — perfect for new creatives
              who want to start aligned without the extras.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>♦ Includes:</p>
              <ul className='text-base space-y-1 ml-4'>
                <li>• 1x Brand Discovery Call</li>
                <li>• Logo Suite (primary, alt, favicon)</li>
                <li>• Color Palette + Font Pairing</li>
                <li>• 1x Moodboard (directional visual language)</li>
                <li>• Mini Brand Sheet PDF (logos, colors, fonts, usage)</li>
                <li>• Asset Export (.png, .svg, .webp)</li>
                <li>• Delivery via Notion Brand Vault</li>
              </ul>
            </div>

            <div className='mb-6'>
              <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
              <p className='text-base'>
                New entrepreneurs, products, companies, or hotels and retreats
                seeking an emotionally aligned, timeless brand foundation.
              </p>
            </div>

            <div className='mb-8'>
              <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
              <p className='text-base'>
                Naming, brand story copy, AI-enhanced brand art, creative
                direction for launch
              </p>
            </div>
            <Link
              href='/studio'
              className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Let&apos;s start now ↵
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
