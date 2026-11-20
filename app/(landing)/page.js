import { performRequest } from '@/lib/datocms';
import { responsiveImageFragment } from '@/lib/fragments';
import Link from 'next/link';
import LandingAnimated from '@/components/landing-animated';
import LandingScrollTracker from '@/components/landing-scroll-tracker';
import WorkPreview from '@/components/work-preview';

const FEATURED_WORK_QUERY = `
  query {
    allPosts(
      filter: {featuredOnLanding: {eq: true}}
      orderBy: date_DESC
      first: 3
    ) {
      title
      slug
      excerpt
      date
      coverImage {
        responsiveImage {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}
`;

export default async function Page() {
  let featuredWork = [];
  try {
    const data = await performRequest({ query: FEATURED_WORK_QUERY });
    featuredWork = data?.allPosts || [];
  } catch (err) {
    console.warn(
      'Featured work query failed. Confirm "featured_on_landing" boolean exists on the Post model in DatoCMS.',
      err?.message || err
    );
  }

  return (
    <section style={{ backgroundColor: '#191919', margin: 0, padding: 0 }}>
      <LandingAnimated />

      {featuredWork.length > 0 && (
        <section
          id='landing-work-section'
          className='relative z-10 px-6 py-16 md:px-16 md:py-24 lg:px-6 lg:py-12'
        >
          <h2
            className='font-long uppercase text-5xl lg:text-6xl mb-10 lg:mb-14'
            style={{ color: '#f5f5f5' }}
          >
            Recent work
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-gray-300'>
            {featuredWork.map((post) => (
              <WorkPreview
                key={post.slug}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        </section>
      )}

      <section className='relative z-20 px-6 pb-16 mt-16 md:px-16 md:pb-24 lg:px-6 lg:pb-12'>
        <div className='calltoaction flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20'>
          <Link
            href='/work'
            className='text-3xl md:text-5xl lg:text-6xl underline hover:opacity-30 duration-150 cursor-pointer text-gray-300'
          >
            See all work ↵
          </Link>
          <Link
            href='/studio#contact'
            className='text-3xl md:text-5xl lg:text-6xl underline hover:opacity-30 duration-150 cursor-pointer text-gray-300'
          >
            Start your project ↵
          </Link>
        </div>
      </section>

      <LandingScrollTracker />
    </section>
  );
}
