import { performRequest } from '@/lib/datocms';
import { toNextMetadata } from 'react-datocms';

import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import ArchiveGrid from '@/components/archive-grid';
import Link from 'next/link';

const PAGE_CONTENT_QUERY = `
query {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
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

function getPageRequest() {
  return { query: PAGE_CONTENT_QUERY };
}

export async function generateMetadata() {
  const { site } = await performRequest(getPageRequest());

  return toNextMetadata([...site.favicon]);
}

export default async function Page() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);
  return (
    <div className='pt-[30px] lg:pt-[60px] pb-6'>
      <ArchiveGrid archives={data.allArchives} />
      <section className='pt-24 pb-24 md:pt-32 md:pb-32'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20'>
          <Link
            href='/studio#contact'
            className='text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'
          >
            Start your project ↵
          </Link>
          <a
            href='https://www.pinterest.com/sofiamoraesmm/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'
          >
            See the full library on Pinterest ↵
          </a>
        </div>
      </section>
    </div>
  );
}
