import { Image as DatocmsImage } from 'react-datocms';

export default function ArchiveGrid({
  archives,
  columnsClassName = 'columns-1 md:columns-2 lg:columns-3',
  sizes,
}) {
  return (
    <div className={`${columnsClassName} gap-4`}>
      {archives.map((archive) => {
        if (!archive?.media?.responsiveImage) {
          console.warn('ArchiveGrid: missing media or responsiveImage; skipping record', {
            slug: archive?.slug,
            media: archive?.media,
          });
          return null;
        }
        return (
        <div
          key={archive.slug}
          className='block break-inside-avoid mb-4'
          style={{ breakInside: 'avoid' }}
        >
          <DatocmsImage
            data={{
              ...archive.media.responsiveImage,
              alt: `Cover Image for ${archive.slug}`,
            }}
            className='w-auto h-auto object-cover'
            lazyLoad
            {...(sizes ? { sizes } : {})}
          />
        </div>
        );
      })}
    </div>
  );
}
