import NextPrev from './next-prev';
import PostBody from './post-body';
import PostHeader from './post-header';
import Blocks from './blocks/blocks';
import Date from './date';
import Link from 'next/link';

export function PostPage({ data }) {
  const { post, morePosts } = data;
  const filteredPosts = morePosts.filter(
    (morePost) => morePost.slug !== post.slug
  );
  const randomPosts = filteredPosts.sort(() => 0.5 - Math.random()).slice(0, 2);

  const sortedBlocks = post.maincontent.sort(
    (a, b) => a._createdAt - b._createdAt
  );
  //console.log(sortedBlocks);

  return (
    <div id='wrapper'>
      <article id='content' className='animate-fadeIn pt-[80px] pb-6'>
        <PostHeader
          title={post.title}
          coverImage={post.headerimage}
          date={post.date}
          excerpt={post.excerpt}
          role={post.role}
          isVideo={post.isvideo}
          urlToClient={post.urltoclient}
          videoLink={post.videolink}
        />
        <section className='flex flex-col gap-4'>
          {sortedBlocks.map((block, index) => (
            // Render your block component based on the block type
            <Blocks key={index} block={block} />
          ))}
        </section>
        <section className='md:flex md:items-start md:justify-between w-full pt-32'>
          <div className='md:w-[60%] md:pr-20'>
            <PostBody content={post.content} />
          </div>
          <div
            id='sticky'
            className='mt-20 mb-20 md:mb-0 md:mt-0 md:w-[40%] flex flex-col text-2xl sticky top-20'
          >
            <div className=''>
              <h2 className='font-secondary font-extralight text-sm'>Client</h2>
              <Link
                href={post.urltoclient}
                target='blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                <p className=' font-semibold'>{post.title}</p>
              </Link>
            </div>
            <div className=''>
              <h2 className='font-secondary font-extralight text-sm'>Role</h2>
              <ul className='flex flex-wrap font-semibold'>
                {post.role.map((singleRole, index, array) => (
                  <Link
                    key={singleRole}
                    href={`/archive/${singleRole.slug}`}
                    className='hover:underline'
                  >
                    <li className='flex relative whitespace-nowrap pr-1'>
                      {singleRole.name}
                      {index === array.length - 1 ? '' : ','}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className=''>
              <h2 className='font-secondary font-extralight text-sm'>Year</h2>
              <p className=' font-semibold'>
                <Date dateString={post.date} />
              </p>
            </div>
          </div>
        </section>
        {morePosts.length > 0 && <NextPrev posts={randomPosts} />}
      </article>
    </div>
  );
}
