import NextPrev from './next-prev';
import PostBody from './post-body';
import PostHeader from './post-header';
import Blocks from './blocks/blocks';

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
    <article className='animate-fadeIn pt-[80px] pb-6'>
      <PostHeader
        title={post.title}
        coverImage={post.headerimage}
        date={post.date}
        excerpt={post.excerpt}
        role={post.role}
        isVideo={post.isvideo}
      />
      <section className='flex flex-col gap-8'>
        {sortedBlocks.map((block, index) => (
          // Render your block component based on the block type
          <Blocks key={index} block={block} />
        ))}
      </section>
      <section className='pt-32'>
        <PostBody content={post.content} />
      </section>
      {morePosts.length > 0 && <NextPrev posts={randomPosts} />}
    </article>
  );
}
