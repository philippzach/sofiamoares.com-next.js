import { StructuredText, Image as DatocmsImage } from 'react-datocms';

export default function PostBody({ content }) {
  return (
    <div className=''>
      <div
        className='font-secondary prose prose-lg prose-blue text-xl md:text-2xl leading-[1.3]'
        id='main-content'
      >
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === 'ImageBlockRecord') {
              return <DatocmsImage data={record.image.responsiveImage} />;
            }

            return (
              <>
                <p>Don&apos;t know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
