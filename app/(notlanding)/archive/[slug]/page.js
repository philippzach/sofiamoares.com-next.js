import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';
import ArchiveGrid from '@/components/archive-grid';

export async function generateStaticParams() {
  const { allCategories } = await performRequest({
    query: `{ allCategories { slug id } }`,
  });
  return allCategories.map(({ slug, id }) => ({
    slug,
    id,
  }));
}

const PAGE_CONTENT_QUERY = `
query ($searchString: String){
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
  allArchives(filter: {slug: {eq: $searchString}}) {
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

function getPageRequest(slug) {
  const { isEnabled } = draftMode();
  const searchString = slug.slug;

  return {
    query: PAGE_CONTENT_QUERY,
    includeDrafts: isEnabled,
    variables: { searchString },
  };
}

export async function generateMetadata({ params }) {
  const { site } = await performRequest(getPageRequest(params));

  return toNextMetadata([...site.favicon]);
}

export default async function Page({ params }) {
  const pageRequest = getPageRequest(params);
  const data = await performRequest(pageRequest);

  return (
    <div className='pt-[30px] lg:pt-[60px] pb-6'>
      <ArchiveGrid archives={data.allArchives} />
    </div>
  );
}
