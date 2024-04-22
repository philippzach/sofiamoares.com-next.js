import PostPreview from './post-preview';

export function PostIndex({ data }) {
  const { allPosts } = data;

  return (
    <div className='grid grid-cols-2 gap-6 gap-y-28 md:grid-cols-3 md:gap-20 mb-32'>
      {allPosts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  );
}
