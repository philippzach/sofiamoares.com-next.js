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

export default async function AICreativePage() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const images = [
    'photo1.png',
    'photo2.png',
    'photo3.png',
    'photo4.png',
    'photo5.png',
    'photo6.png',
    'photo7.png',
    'photo8.png',
    'blackhole.webp',
    'background.webp',
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Layout - Single Column */}
      <div className='md:hidden'>
        <div className='p-8 pt-24 pb-12 text-prim-grey'>
          <h1 className='text-4xl font-bold mb-4'>
            Gen-AI Creative Technologist
          </h1>

          <p className='text-lg font-semibold mb-6'>Starting from 750 €</p>

          <p className='text-lg mb-6'>
            Future-ready visuals, generated through advanced AI workflows and
            directed by human intuition.
          </p>

          <div className='mb-6'>
            <p className='font-semibold mb-3'>♦ Includes:</p>
            <ul className='text-base space-y-1 ml-4'>
              <li>• 1x Discovery Call & Creative Brief</li>
              <li>• Concept Ideation & Prompt Engineering</li>
              <li>• Generative Imagery / Animation suite (10+ assets)</li>
              <li>• AI Style & Asset Library (colors, textures, references)</li>
              <li>• Usage Rights & Delivery (hi-res .png / .webp / .mp4)</li>
              <li>• Personalized Workflow Walkthrough video</li>
            </ul>
          </div>

          <div className='mb-6'>
            <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
            <p className='text-base'>
              Visionary brands, marketing teams, and artists ready to explore
              the bleeding edge of generative design and storytelling.
            </p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
            <p className='text-base'>
              Motion Graphics, Web Integration, Brand Identity Upgrade,
              Copywriting
            </p>
          </div>

          <Link
            href='/studio'
            className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
          >
            Book a call ↵
          </Link>
          <div className='mb-8'>
            <p className='text-base mb-4'>
              Ready to pioneer with AI? Let&apos;s talk about your vision and
              craft a roadmap together.
            </p>
          </div>
        </div>

        {/* Mobile Images Grid */}
        <div className='grid grid-cols-1 gap-4 p-8'>
          {images.map((image, index) => (
            <div key={index} className='relative aspect-square'>
              <Image
                src={`/photos/aigeneration/${image}`}
                alt={`AI Creative Example ${index + 1}`}
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
                  src={`/photos/aigeneration/${image}`}
                  alt={`AI Creative Example ${index + 1}`}
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
            <h1 className='text-4xl font-bold mb-4'>
              Gen-AI Creative Technologist
            </h1>

            <p className='text-lg font-semibold mb-6'>Starting from 750 €</p>

            <p className='text-lg mb-6'>
              Future-ready visuals, generated through advanced AI workflows and
              directed by human intuition.
            </p>

            <div className='mb-6'>
              <p className='font-semibold mb-3'>♦ Includes:</p>
              <ul className='text-base space-y-1 ml-4'>
                <li>• 1x Discovery Call & Creative Brief</li>
                <li>• Concept Ideation & Prompt Engineering</li>
                <li>• Generative Imagery / Animation suite (10+ assets)</li>
                <li>
                  • AI Style & Asset Library (colors, textures, references)
                </li>
                <li>• Usage Rights & Delivery (hi-res .png / .webp / .mp4)</li>
                <li>• Personalized Workflow Walkthrough video</li>
              </ul>
            </div>

            <div className='mb-6'>
              <p className='font-semibold mb-2'>♦ Who It&apos;s For:</p>
              <p className='text-base'>
                Visionary brands, marketing teams, and artists ready to explore
                the bleeding edge of generative design and storytelling.
              </p>
            </div>

            <div className='mb-8'>
              <p className='font-semibold mb-2'>♦ Optional Add-ons:</p>
              <p className='text-base'>
                Motion Graphics, Web Integration, Brand Identity Upgrade,
                Copywriting
              </p>
            </div>

            <Link
              href='/studio'
              className='inline-block my-5 bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
            >
              Book a call ↵
            </Link>
            <div className='mb-8'>
              <p className='text-base mb-4'>
                Ready to pioneer with AI? Let&apos;s talk about your vision and
                craft a roadmap together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
