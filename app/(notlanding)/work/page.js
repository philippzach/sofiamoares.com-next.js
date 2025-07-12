import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import { DraftPostIndex } from '@/components/draft-post-index';
import { WorkIndex } from '@/components/work-index';
import Link from 'next/link';

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

  return toNextMetadata([...site.favicon, ...blog.seo]);
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
        <p className='group text-stone-300 font-bold text-3xl mt-44 mb-32 md:text-5xl lg:text-6xl leading-[0.95]'>
          <Link
            href='/archive'
            className='group-hover:text-stone-700 underline underline-offset-1 '
          >
            View project index{' '}
          </Link>
          containing +48 additional works.
        </p>
      </section>
    </div>
  );
}
