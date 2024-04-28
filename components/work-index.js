import WorkPreview from './work-preview';

export function WorkIndex({ data }) {
  const { allPosts } = data;

  return (
    <div className='grid grid-cols-2 gap-6 gap-y-28 md:grid-cols-3 md:gap-20 mb-32'>
      {allPosts.map((post) => (
        <WorkPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  );
}
