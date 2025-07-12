import CloudinaryImage, {
  CloudinarySquareImage,
  CloudinaryFullImage,
  CloudinaryLongImage,
} from '../cloudinary-image';

// Cloudinary version of SquareImage
export function CloudinarySquareImageBlock({ image }) {
  const { publicId, title } = image;
  return (
    <div>
      <CloudinarySquareImage
        publicId={publicId}
        alt={title || 'Square image'}
        className='h-auto object-contain object-left-bottom w-full block'
      />
    </div>
  );
}

// Cloudinary version of FullImage
export function CloudinaryFullImageBlock({ image }) {
  const { publicId, title } = image;
  return (
    <CloudinaryFullImage
      publicId={publicId}
      alt={title || 'Full image'}
      className='h-auto object-contain object-left-bottom w-full block'
    />
  );
}

// Cloudinary version of LongImage
export function CloudinaryLongImageBlock({ image }) {
  const { publicId, title } = image;
  return (
    <CloudinaryLongImage
      publicId={publicId}
      alt={title || 'Long image'}
      className='object-cover w-full h-full'
    />
  );
}

// Cloudinary version of ImageImage (two images side by side)
export function CloudinaryImageImageBlock({ imageone, imagetwo }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div>
        <CloudinarySquareImageBlock image={imageone} />
      </div>
      <div>
        <CloudinarySquareImageBlock image={imagetwo} />
      </div>
    </div>
  );
}

// Cloudinary version of DifferentSize
export function CloudinaryDifferentSizeBlock({
  longimage,
  squareimage,
  flip,
  end,
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
      {flip ? (
        <>
          <div
            className={`col-span-4 md:col-span-3 order-2 md:order-1 ${
              end ? 'self-end' : ''
            }`}
          >
            <CloudinarySquareImageBlock image={squareimage} />
          </div>
          <div className='col-span-4 order-1 md:order-2'>
            <CloudinaryFullImageBlock image={longimage} />
          </div>
        </>
      ) : (
        <>
          <div className='col-span-4'>
            <CloudinaryFullImageBlock image={longimage} />
          </div>
          <div className={`col-span-4 md:col-span-3 ${end ? 'self-end' : ''}`}>
            <CloudinarySquareImageBlock image={squareimage} />
          </div>
        </>
      )}
    </div>
  );
}

// Cloudinary version of DifferentSize3img
export function CloudinaryDifferentSize3imgBlock({
  longimage,
  squareimageone,
  squareimagetwo,
  flip,
  end,
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
      {flip ? (
        <>
          <div className='col-span-4 md:col-span-3 order-2 md:order-1 space-y-4'>
            <CloudinarySquareImageBlock image={squareimageone} />
            <CloudinarySquareImageBlock image={squareimagetwo} />
          </div>
          <div
            className={`col-span-4 order-1 md:order-2 ${end ? 'self-end' : ''}`}
          >
            <CloudinaryFullImageBlock image={longimage} />
          </div>
        </>
      ) : (
        <>
          <div className='col-span-4'>
            <CloudinaryFullImageBlock image={longimage} />
          </div>
          <div className={`col-span-3 space-y-4 ${end ? 'self-end' : ''}`}>
            <CloudinarySquareImageBlock image={squareimageone} />
            <CloudinarySquareImageBlock image={squareimagetwo} />
          </div>
        </>
      )}
    </div>
  );
}

// Cloudinary version of DifferentSize3imgfixed
export function CloudinaryDifferentSize3imgfixedBlock({
  longimage,
  squareimageone,
  squareimagetwo,
  flip,
  end,
}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      {flip ? (
        <>
          <div className='col-span-4 md:col-span-2 md:pr-2'>
            <div className='row-span-1 '>
              <CloudinarySquareImageBlock image={squareimageone} />
              <CloudinarySquareImageBlock image={squareimagetwo} />
            </div>
          </div>
          <div className='col-span-4 md:col-span-2 row-span-2 md:pl-2 self-start'>
            <div className='w-full h-full'>
              <CloudinaryLongImageBlock image={longimage} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='col-span-4 md:col-span-2 row-span-2 self-start'>
            <CloudinaryLongImageBlock image={longimage} />
          </div>
          <div className='col-span-4 md:col-span-2 space-y-4'>
            <div className='row-span-1 space-y-4'>
              <CloudinarySquareImageBlock image={squareimageone} />
              <CloudinarySquareImageBlock image={squareimagetwo} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Cloudinary version of EmptyImageBlock
export function CloudinaryEmptyImageBlock({ image, flip }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {flip ? (
        <>
          <div className=''>
            <CloudinarySquareImageBlock image={image} />
          </div>
          <div className=''></div>
        </>
      ) : (
        <>
          <div className=''></div>
          <div className=''>
            <CloudinarySquareImageBlock image={image} />
          </div>
        </>
      )}
    </div>
  );
}
