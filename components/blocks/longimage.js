import { Image as DatocmsImage } from 'react-datocms';

export default function LoImage({ image }) {
  const { responsiveImage, title } = image;
  return (
    <>
      <DatocmsImage
        data={{
          ...responsiveImage,
          alt: `Cover Image for ${title}`,
        }}
        pictureClassName='object-cover w-full h-full '
        placeholderClassName='object-cover w-full h-full  '
        className='object-cover w-full h-full'
      />
    </>
  );
}
