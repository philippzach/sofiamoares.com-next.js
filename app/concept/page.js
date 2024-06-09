import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';
import Animation from '@/components/animation/animation';

const PAGE_CONTENT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
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
  const { site } = await performRequest(getPageRequest());

  return toNextMetadata([...site.favicon]);
}

export default async function Page() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);
  //const profilePic = data.concept.profile;

  return <>{/* <Animation profilePic={profilePic} /> */}</>;
}
