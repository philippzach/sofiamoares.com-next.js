import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment } from '@/lib/fragments';

import LandingLogic from '@/components/landing-logic';

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
    allCarousels {
      id
      isblack
      isvideo
      client
      description
      media {
        id
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

export default async function Page() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const carousels = data.allCarousels;

  return <LandingLogic data={carousels} />;
}
