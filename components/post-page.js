import NextPrev from './next-prev';
import PostBody from './post-body';
import PostHeader from './post-header';
import SectionSeparator from './section-separator';

export function PostPage({ data }) {
  const { post, morePosts } = data;
  const filteredPosts = morePosts.filter(
    (morePost) => morePost.slug !== post.slug
  );
  const randomPosts = filteredPosts.sort(() => 0.5 - Math.random()).slice(0, 2);
  return (
    <article className='animate-fadeIn pt-[80px] pb-6'>
      <PostHeader
        title={post.title}
        coverImage={post.headerimage}
        date={post.date}
        excerpt={post.excerpt}
        role={post.role}
      />
      <PostBody content={post.content} />
      {morePosts.length > 0 && <NextPrev posts={randomPosts} />}
    </article>
  );
}
