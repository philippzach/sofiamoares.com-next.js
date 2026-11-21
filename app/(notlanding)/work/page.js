import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import { DraftPostIndex } from '@/components/draft-post-index';
import { WorkIndex } from '@/components/work-index';
import Link from 'next/link';
import ArchiveGrid from '@/components/archive-grid';

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
    allPosts(orderBy: date_DESC, first: 20) {
      title
      slug
      excerpt
      date
      coverImage {
        responsiveImage {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    allArchives(first: 50) {
      slug
      media {
        responsiveImage {
          ...responsiveImageFragment
        }
      }
    }
  }

  ${metaTagsFragment}
  ${responsiveImageFragment}
`;

async function getPageRequest() {
  const { isEnabled } = await draftMode();

  return { query: PAGE_CONTENT_QUERY, includeDrafts: isEnabled };
}

export async function generateMetadata() {
  const { site, blog } = await performRequest(await getPageRequest());

  return {
    ...toNextMetadata([...site.favicon, ...blog.seo]),
    title: 'Brand Identity Systems and Visual Architecture, Sofia Moraes',
    description: 'Complete visual brand systems for conscious brands, eco-luxury, and mission-driven founders. From strategy to the visual language that makes your brand undeniable.',
  };
}

export default async function Page() {
  const { isEnabled } = await draftMode();

  const pageRequest = await getPageRequest();
  const data = await performRequest(pageRequest);

  if (isEnabled) {
    return (
      <DraftPostIndex
        subscription={{
          ...pageRequest,
          initialData: data,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
        }}
      />
    );
  }

  return (
    <div className='pt-[120px] lg:pt-[200px] pb-6'>
      <section className='min-h-screen'>
        <WorkIndex data={data} />
        <section className='mt-32 md:mt-40 lg:mt-32 pt-16 md:pt-24 lg:pt-12'>
          <h2 className='font-long uppercase text-5xl lg:text-6xl mb-10 lg:mb-14'>
            More work
          </h2>
          <ArchiveGrid
            archives={data.allArchives}
            columnsClassName='columns-2 md:columns-3 lg:columns-4'
            sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
          />
        </section>
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 mt-24 mb-32 md:mt-32'>
          <a
            href='https://www.pinterest.com/sofiamoraesmm/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'
          >
            See the full library on Pinterest ↵
          </a>
          <Link href='/studio#contact' className='text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'>
            Start your project ↵
          </Link>
        </div>
      </section>
    </div>
  );
}
