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
        <div className='whitespace-normal leading-[1] text-[18px] md:text-[22px] lg:text-[30px] tracking-tight font-medium'>
          <div>{title},</div>
          <div className='group-hover:opacity-30'>{excerpt}</div>
        </div>
      </Link>
    </>
  );
}
