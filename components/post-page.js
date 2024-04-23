import MoreStories from './more-stories';
import PostBody from './post-body';
import PostHeader from './post-header';
import SectionSeparator from './section-separator';
import Footer from './footer';

export function PostPage({ data }) {
  const { post, morePosts } = data;

  return (
    <article className='animate-fadeIn pt-[80px] pr-4 pl-4 pb-6'>
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
        excerpt={post.excerpt}
        role={post.role}
      />
      <PostBody content={post.content} />
      <SectionSeparator />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      <Footer />
    </article>
  );
}
