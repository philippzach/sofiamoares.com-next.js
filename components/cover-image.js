import { Image as DatocmsImage } from 'react-datocms';
import cn from 'classnames';
import Link from 'next/link';

export default function CoverImage({ title, responsiveImage, slug }) {
  const image = (
    <DatocmsImage
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${title}`,
      }}
      className={cn(
        'h-full object-contain object-position-bottom object-position-left w-auto'
      )}
    />
  );
  return <div className='flex items-end h-full justify-center'>{image}</div>;
}
