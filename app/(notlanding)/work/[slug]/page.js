import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import { PostPage } from '@/components/post-page';

export async function generateStaticParams() {
  const { allPosts } = await performRequest({ query: `{ allPosts { slug } }` });

  return allPosts.map(({ slug }) => ({ slug }));
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
      videolink
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
        ... on Image2xlongRecord {
          id
          _createdAt
          image {
            responsiveImage(imgixParams: {fm: jpg}) {
              ...responsiveImageFragment
            }
          }
        }
        ... on EmptyimageblockRecord {
          id 
          flip
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
        ... on VideoblockRecord {
          id
          videolink
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
        ... on SmalltextRecord {
          id
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
        ... on DifferentsizeRecord { id _createdAt flip end longimage { id responsiveImage(imgixParams: {fm: jpg }){ ...responsiveImageFragment } } squareimage { id responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1200, h: 1200 }) { ...responsiveImageFragment } } }
        ... on Differentsize3imgRecord {
          id
          flip
          end
          _createdAt
          longimage {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1200, h: 2400}){
              ...responsiveImageFragment
            }
          }
           squareimageone {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1200, h: 1200 }){
              ...responsiveImageFragment
            }
          }
          squareimagetwo {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1200, h: 1200 }){
              ...responsiveImageFragment
            }
          }
        }
        ... on ImageoffcenterRecord {
          id
          flip
          image {
            id
            responsiveImage (imgixParams: {fm: jpg}){
              ...responsiveImageFragment
            }
          }

        }
        ... on VideooffcenterRecord {
          id
          flip
          videolink
          video {
            id
            
            video {
              muxPlaybackId
              blurUpThumb
            }
          }
        }
        ... on HalfvideovideoRecord {
          id
          videoone {
            id
            video {
              muxPlaybackId
              blurUpThumb
            }
          }
          videotwo {
            id
            video {
              muxPlaybackId
              blurUpThumb
            }
          }
        }
        ... on CarouselimageRecord {
          id
          flip
          image {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
              ...responsiveImageFragment
          }
        }
          carousel {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
              ...responsiveImageFragment
          }
        }
      }
      ... on CarouselvideoRecord {
        id
        flip
        videolink
        carousel {
          id
          responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
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
      ... on DifferentsizeimagevideoRecord {
        id
        flip
        end
        image {
          id
          responsiveImage (imgixParams: {fm: jpg}){
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
      ... on Differentsize3videoRecord {
        id
        flip
        end
        longimage {
          id
          responsiveImage (imgixParams: {fm: jpg}){
            ...responsiveImageFragment
          }
        }
        squareimageone {
          id
          responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
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
      ... on Differentsize3carouselRecord {
        id
        flip
        end
        longimage {
          id
          responsiveImage (imgixParams: {fm: jpg}){
            ...responsiveImageFragment
          }
        }
        squareimageone {
          id
          responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
            ...responsiveImageFragment
          }
        }
        carousel {
          id
          responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
            ...responsiveImageFragment
          }
      }
    }
    ... on Differentsize3videocarouselRecord {
      id 
      flip
      end
      longimage {
        id
        responsiveImage (imgixParams: {fm: jpg}){
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
      carousel {
        id
        responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
          ...responsiveImageFragment
        }
      }
    }
      ... on DifferentsizeimagecarouselRecord {
        id
        flip
        end
        image {
          id
          responsiveImage (imgixParams: {fm: jpg}){
            ...responsiveImageFragment
          }
        }
        carousel {
          id
          responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
            ...responsiveImageFragment
          }
        }
      }

        ... on Differentsize3imgfixedRecord {
          id
          flip
          _createdAt
          longimage {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 2000}){
              ...responsiveImageFragment
            }
          }
           squareimageone {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
              ...responsiveImageFragment
            }
          }
          squareimagetwo {
            id
            responsiveImage (imgixParams: {fm: jpg, fit: crop, w: 1000, h: 1000 }){
              ...responsiveImageFragment
            }
          }
        }
        ... on ImagevideoblockRecord {
          id
          flip
          videolink
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
