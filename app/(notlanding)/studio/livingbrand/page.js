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
    title: 'The Living Brand, Complete Creative Direction. Sofia Moraes',
    description: 'Complete creative direction from the ground up. Strategy, identity, content system, and a website ready to launch.',
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
            Type: One-time project · $2,500–4,500 · 3–4 weeks
          </p>

          <Link
            href='/studio#contact'
            className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Start your project ↵
          </Link>

          <p className='text-lg mb-6'>
            Your identity, and the place people land when they find you. I
            build the whole world: strategy, visual system, and a website
            ready to launch, plus the system that lets you keep making new
            work without losing the thread.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ What you receive:</p>
            <ul className='text-base space-y-1 ml-4'>
              <li>• Everything in The Seed</li>
              <li>
                • Brand strategy foundation: positioning, audience, and the
                one sentence your brand has to make people feel
              </li>
              <li>
                • Complete identity system: logo and marks, colour,
                typography, texture, art direction
              </li>
              <li>• Website designed and built, ready to launch</li>
              <li>• Imagery world: 40+ brand visuals built from your seed</li>
              <li>
                • Your AI direction system: the references, prompts and
                guardrails that let you generate new visuals without losing the
                identity
              </li>
              <li>• Brand guidelines and a handover session</li>
            </ul>
          </div>

          <div className='mb-6'>
            <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
            <p className='text-base'>
              Founder-led brands with a strong mission and no visual language
              that matches it yet. Companies rebuilding into something
              coherent, and brands entering a new phase.
            </p>
          </div>

          <p className='text-base mb-4'>Tell me what you&apos;re building.</p>
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
        <div className='w-1/2 sticky top-0 self-start max-h-screen overflow-y-auto mb-24'>
          <div className='p-8 pt-24 text-prim-grey'>
            <h1 className='text-4xl font-bold mb-4'>The Living Brand</h1>

            <p className='text-lg font-semibold mb-6'>
              Type: One-time project · $2,500–4,500 · 3–4 weeks
            </p>

            <Link
              href='/studio#contact'
              className='inline-block mb-8 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Start your project ↵
            </Link>

            <p className='text-lg mb-6'>
              Your identity, and the place people land when they find you. I
              build the whole world: strategy, visual system, and a website
              ready to launch, plus the system that lets you keep making new
              work without losing the thread.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>♦ What you receive:</p>
              <ul className='text-base space-y-1 ml-4'>
                <li>• Everything in The Seed</li>
                <li>
                  • Brand strategy foundation: positioning, audience, and the
                  one sentence your brand has to make people feel
                </li>
                <li>
                  • Complete identity system: logo and marks, colour,
                  typography, texture, art direction
                </li>
                <li>• Website designed and built, ready to launch</li>
                <li>
                  • Imagery world: 40+ brand visuals built from your seed
                </li>
                <li>
                  • Your AI direction system: the references, prompts and
                  guardrails that let you generate new visuals without losing
                  the identity
                </li>
                <li>• Brand guidelines and a handover session</li>
              </ul>
            </div>

            <div className='mb-6'>
              <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
              <p className='text-base'>
                Founder-led brands with a strong mission and no visual language
                that matches it yet. Companies rebuilding into something
                coherent, and brands entering a new phase.
              </p>
            </div>

            <p className='text-base mb-4'>
              Tell me what you&apos;re building.
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
