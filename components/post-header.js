import Date from './date';
import CoverImage from './image-preview';
import PostHeaderVideo from './post-header-video';
import Link from 'next/link';

export default function PostHeader({
  title,
  coverImage,
  date,
  role,
  excerpt,
  isVideo,
  urlToClient,
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
          <Link
            href={urlToClient}
            target='blank'
            rel='noopener noreferrer'
            className='hover:underline'
          >
            <p className=' font-semibold'>{title}</p>
          </Link>
        </div>
        <div className='flex order-2 items-end  flex-col lg:gap-1 md:flex-col lg:items-baseline lg:flex-row md:w-2/12'>
          <h2 className='font-secondary font-extralight text-sm'>Year</h2>
          <p className=' font-semibold'>
            <Date dateString={date} />
          </p>
        </div>
        <div className='flex order-3 items-end flex-col lg:gap-1 md:flex-col lg:items-baseline lg:flex-row md:w-2/3'>
          <h2 className='font-secondary font-extralight text-sm'>Role</h2>
          <p className='flex flex-wrap font-semibold justify-end'>
            {role.map((singleRole, index, array) => (
              <Link
                key={singleRole}
                href={`/archive/${singleRole.slug}`}
                className='hover:underline whitespace-pre-wrap pl-1'
              >
                {singleRole.name}
                {index === array.length - 1 ? '' : ','}
              </Link>
            ))}
          </p>
        </div>
      </section>

      <div className='mb-4 md:mb-4 -mx-5 aspect-video'>
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
