import { Image as DatocmsImage } from 'react-datocms';

export default function LoImage({ image }) {
  if (!image?.responsiveImage) {
    console.warn('LoImage: missing image or responsiveImage; skipping block', { image });
    return null;
  }
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
