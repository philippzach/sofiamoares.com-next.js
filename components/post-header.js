import Date from './date';
import CoverImage from './image-preview';
import PostHeaderVideo from './post-header-video';

export default function PostHeader({
  title,
  coverImage,
  date,
  role,
  excerpt,
  isVideo,
}) {
  return (
    <>
      <section className='block leading-[1] tracking-tight mb-10 md:mb-32 text-3xl md:text-6xl lg:text-7xl font-semibold'>
        <h1>{title},</h1>
        <div className='max-w-md md:max-w-2xl lg:max-w-5xl text-balance'>
          <p>{excerpt}</p>
        </div>
      </section>
      <section className='flex flex-col mb-1 justify-between md:flex-row md:item-start md:items-center '>
        <div className='flex order-1 items-end  flex-col lg:gap-1 md:flex-col lg:items-baseline lg:flex-row md:w-2/12'>
          <h2 className='font-secondary font-extralight text-sm'>Client</h2>
          <p className=' font-semibold'>{title}</p>
        </div>
        <div className='flex order-2 items-end  flex-col lg:gap-1 md:flex-col lg:items-baseline lg:flex-row md:w-2/12'>
          <h2 className='font-secondary font-extralight text-sm'>Year</h2>
          <p className=' font-semibold'>
            <Date dateString={date} />
          </p>
        </div>
        <div className='flex order-3 items-end flex-col lg:gap-1 md:flex-col lg:items-baseline lg:flex-row md:w-2/3'>
          <h2 className='font-secondary font-extralight text-sm'>Role</h2>
          <ul className='flex flex-wrap font-semibold'>
            <li className='flex relative whitespace-nowrap pr-1'>{role}</li>
          </ul>
        </div>
      </section>

      <div className='mb-8 md:mb-16 -mx-5 sm:mx-0 aspect-video'>
        {isVideo ? (
          <PostHeaderVideo data={coverImage} />
        ) : (
          <CoverImage
            title={title}
            responsiveImage={coverImage.responsiveImage}
          />
        )}
      </div>
    </>
  );
}
