import { performRequest } from '@/lib/datocms';
import { toNextMetadata } from 'react-datocms';

import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import ArchiveGrid from '@/components/archive-grid';

const PAGE_CONTENT_QUERY = `
query {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
  allArchives {
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
    </div>
  );
}
