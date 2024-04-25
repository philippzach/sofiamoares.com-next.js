import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment } from '@/lib/fragments';
import { validateCookie } from '@/lib/actions';

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
      client
      description
      media {
        id
        alt
        url
        video {
          muxAssetId
          muxPlaybackId
          streamingUrl
          thumbnailUrl(format: png)
          thumbhash
        }
        responsiveImage {
          alt
          base64
          bgColor
          title
          src
          height
          sizes
          aspectRatio
          width
        }
      }
      isblack
      isvideo
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

  const hasVisited = await validateCookie();

  return <LandingLogic dataUnshuffled={carousels} hasVisited={hasVisited} />;
}