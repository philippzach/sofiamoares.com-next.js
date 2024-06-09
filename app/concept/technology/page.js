import { toNextMetadata } from 'react-datocms';
import { Image as DatocmsImage } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

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

export default async function Tech() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);
  //const imageGalery = data.concept.galery;
  return (
    <main className='pt-4 h-screen animate-fadeIn'>
      <ul className='flex flex-wrap items-center justify-center gap-3'>
        {/* {imageGalery.map((image, i) => (
          <li key={i} className='h-96 max-w-96'>
            <div>
              <DatocmsImage
                data={image.responsiveImage}
                pictureClassName='z-10 h-auto object-contain object-left-bottom w-full block'
                placeholderClassName='z-10 h-auto object-contain object-left-bottom w-full block'
                className='z-10 flex flex-end h-full justify-center'
              />
            </div>
          </li>
        ))} */}
      </ul>
    </main>
  );
}
