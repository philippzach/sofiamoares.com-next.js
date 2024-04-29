import { Image as DatocmsImage } from 'react-datocms';

export default function FullImage({ image }) {
  const { responsiveImage, title } = image;
  return (
    <>
      <DatocmsImage
        data={{
          ...responsiveImage,
          alt: `Cover Image for ${title}`,
        }}
        pictureClassName='h-auto object-contain object-left-bottom w-full block'
        placeholderClassName='h-auto object-contain object-left-bottom w-full block'
        className='flex flex-end h-full justify-center'
      />
    </>
  );
}
