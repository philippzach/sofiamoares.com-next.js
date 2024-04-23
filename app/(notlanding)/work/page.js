import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import { DraftPostIndex } from '@/components/draft-post-index';
import { WorkIndex } from '@/components/work-index';
import Footer from '@/components/footer';

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
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
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

function getPageRequest() {
  const { isEnabled } = draftMode();

  return { query: PAGE_CONTENT_QUERY, includeDrafts: isEnabled };
}

export async function generateMetadata() {
  const { site, blog } = await performRequest(getPageRequest());

  return toNextMetadata([...site.favicon, ...blog.seo]);
}

export default async function Page() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest();
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
    <div className='pt-[120px] lg:pt-[200px] pr-4 pl-4 pb-6'>
      <section className='min-h-screen'>
        <WorkIndex data={data} />
      </section>
      <Footer />
    </div>
  );
}
