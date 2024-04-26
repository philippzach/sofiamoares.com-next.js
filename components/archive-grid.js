import { Image as DatocmsImage } from 'react-datocms';

export default function ArchiveGrid({ archives }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {archives.map((archive) => (
        <div key={archive.slug} className='relative bg-gray-200'>
          <DatocmsImage
            data={{
              ...archive.media.responsiveImage,
              alt: `Cover Image for ${archive.slug}`,
            }}
            className='w-full h-full object-cover'
          />
        </div>
      ))}
    </div>
  );
}
