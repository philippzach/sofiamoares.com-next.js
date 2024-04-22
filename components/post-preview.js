import Avatar from './avatar';
import Date from './date';
import CoverImage from './cover-image';
import Link from 'next/link';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <Link href={`/work/${slug}`} className='group'>
      <div className='flex items-end aspect-[0.8] justify-center mb-10 w-full'>
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <div className='whitespace-normal leading-[0.9] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[2rem] tracking-tight font-medium'>
        <div>{title},</div>
        <div className='group-hover:opacity-30'>{excerpt}</div>
        {/* <Avatar name={author.name} picture={author.picture} /> */}
      </div>
    </Link>
  );
}
