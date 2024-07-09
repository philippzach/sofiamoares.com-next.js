import { Image as DatocmsImage } from 'react-datocms';

export default function ArchiveGrid({ archives }) {
  return (
    <div className='columns-1 md:columns-2 lg:columns-3 gap-4'>
      {archives.map((archive) => (
        <div
          key={archive.slug}
          className='break-inside-avoid mb-4'
          style={{ breakInside: 'avoid' }}
        >
          <DatocmsImage
            data={{
              ...archive.media.responsiveImage,
              alt: `Cover Image for ${archive.slug}`,
            }}
            className='w-auto h-auto object-cover'
          />
        </div>
      ))}
    </div>
  );
}
