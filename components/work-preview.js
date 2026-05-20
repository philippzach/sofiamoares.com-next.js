import CoverImage from './image-preview';
import Link from 'next/link';

export default function WorkPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <>
      <Link href={`/work/${slug}`} className='group animate-fadeIn'>
        <div className='flex items-end aspect-[0.8] justify-center mb-5 md:mb-7 w-full'>
          <CoverImage
            slug={slug}
            title={title}
            responsiveImage={coverImage.responsiveImage}
          />
        </div>
        <div className='whitespace-normal leading-[1] text-[1.125rem] md:text-[1.375rem] lg:text-[1.75rem] tracking-tight font-medium'>
          <div>{title},</div>
          <div className='group-hover:opacity-30'>{excerpt}</div>
        </div>
      </Link>
    </>
  );
}
