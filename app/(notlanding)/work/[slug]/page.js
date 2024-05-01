import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import { PostPage } from '@/components/post-page';

export async function generateStaticParams() {
  const { allPosts } = await performRequest({ query: `{ allPosts { slug } }` });

  return allPosts.map(({ slug }) => slug);
}

const PAGE_CONTENT_QUERY = `
  query PostBySlug($slug: String) {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    post(filter: {slug: {eq: $slug}}) {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
      title
      excerpt
      slug
      urltoclient
      role {
        name
        slug
      }
      content {
        value
        blocks {
          __typename
          ...on ImageBlockRecord {
            id
            image {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
      date
      ogImage: coverImage{
        url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
      }
      isvideo
      headerimage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2500, h: 1250 }) {
          ...responsiveImageFragment
        }
        video {
          muxAssetId
          muxPlaybackId
          streamingUrl
          blurUpThumb
          thumbnailUrl(format: png)
          thumbhash
        }
      }
      maincontent {
        ... on RecordInterface {
          id 
          _modelApiKey
        }
        __typename
        ... on ImageBlockRecord {
          id
          _createdAt
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2500, h: 1250 }) {
              ...responsiveImageFragment
            }
          }
        }
        ... on VideoblockRecord {
          id
        singlevideo {
          video {
            alt
            blurUpThumb
            blurhash
            thumbhash
            title
            muxPlaybackId
          }
        }
        _createdAt
        }
        ... on BigtextblockRecord {
          id
          _createdAt
          smalltext
          text
        }
        ... on ImagetextblockRecord {
          id
          _createdAt
          flip
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          description
        }
        ... on ImageimageblockRecord {
          id
          _createdAt
          imageone {
            id
            responsiveImage{
              ...responsiveImageFragment
            }
          }
          imagetwo {
            id
            responsiveImage{
              ...responsiveImageFragment
            }
          }
        }
        ... on ImagevideoblockRecord {
          id
          flip
          _createdAt
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1200, h: 1200 }){
              ...responsiveImageFragment
            }
          }
          video {
            id
            video {
              muxPlaybackId
              blurUpThumb
            }
          }
        }
      }
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
            ...responsiveImageFragment
          }
        }
      }
    }

    morePosts: allPosts {
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
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
            ...responsiveImageFragment
          }
        }
      }
    }
  }

  ${responsiveImageFragment}
  ${metaTagsFragment}
`;

function getPageRequest(slug) {
  const { isEnabled } = draftMode();

  return {
    query: PAGE_CONTENT_QUERY,
    includeDrafts: isEnabled,
    variables: { slug },
  };
}

export async function generateMetadata({ params }) {
  const { site, post } = await performRequest(getPageRequest(params.slug));

  return toNextMetadata([...site.favicon, ...post.seo]);
}

export default async function Page({ params }) {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest(params.slug);
  const data = await performRequest(pageRequest);

  return <PostPage data={data} />;
}
