import { Image as DatocmsImage } from 'react-datocms';

export default function ArchiveGrid({ archives }) {
  return (
    <div className='columns-1 md:columns-2 lg:columns-3 gap-4'>
      {archives.map((archive) => (
        <a
          key={archive.slug}
          href='https://www.pinterest.com/sofiamoraesmm/'
          target='_blank'
          rel='noopener noreferrer'
          className='block break-inside-avoid mb-4 transition-opacity duration-200 hover:opacity-80 cursor-pointer'
          style={{ breakInside: 'avoid' }}
          aria-label='Open Sofia Moraes Pinterest in a new tab'
        >
          <DatocmsImage
            data={{
              ...archive.media.responsiveImage,
              alt: `Cover Image for ${archive.slug}`,
            }}
            className='w-auto h-auto object-cover'
          />
        </a>
      ))}
    </div>
  );
}
