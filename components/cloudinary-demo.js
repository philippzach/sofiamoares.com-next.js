import CloudinaryImage, {
  CloudinarySquareImage,
  CloudinaryFullImage,
  CloudinaryLongImage,
} from './cloudinary-image';

export default function CloudinaryDemo() {
  // Using actual Cloudinary sample images that exist
  const demoImages = {
    square: 'samples/dessert-on-a-plate',
    full: 'samples/cup-on-a-table',
    long: 'samples/coffee',
    custom: 'samples/man-portrait',
    nature: 'samples/breakfast',
    people: 'samples/balloons',
    animals: 'samples/smile',
  };

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <h1 className='text-3xl font-bold mb-8'>
        Cloudinary Image Integration Demo
      </h1>

      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8'>
        <h2 className='text-lg font-semibold text-blue-800 mb-2'>
          Setup Instructions
        </h2>
        <p className='text-blue-700 mb-2'>
          This demo uses Cloudinary&apos;s sample images. To use your own
          images:
        </p>
        <ol className='text-blue-700 list-decimal list-inside space-y-1'>
          <li>
            Create a Cloudinary account at{' '}
            <a href='https://cloudinary.com' className='underline'>
              cloudinary.com
            </a>
          </li>
          <li>
            Add your credentials to{' '}
            <code className='bg-blue-100 px-1 rounded'>.env.local</code>
          </li>
          <li>Upload your images to Cloudinary</li>
          <li>
            Replace the sample public IDs with your actual image public IDs
          </li>
        </ol>
        <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded'>
          <h3 className='text-sm font-semibold text-green-800 mb-1'>
            ✨ Enhanced Features
          </h3>
          <ul className='text-green-700 text-sm list-disc list-inside space-y-1'>
            <li>Lazy loading blur effects for better UX</li>
            <li>Smooth fade-in transitions (500ms)</li>
            <li>Responsive image optimization</li>
            <li>Automatic error handling</li>
          </ul>
        </div>
      </div>

      {/* Square Image Example */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Square Image</h2>
        <div className='max-w-md'>
          <CloudinarySquareImage
            publicId={demoImages.square}
            alt='Square image example'
          />
        </div>
      </section>

      {/* Full Width Image Example */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Full Width Image</h2>
        <CloudinaryFullImage
          publicId={demoImages.full}
          alt='Full width image example'
        />
      </section>

      {/* Long/Portrait Image Example */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Long/Portrait Image</h2>
        <div className='max-w-sm'>
          <CloudinaryLongImage
            publicId={demoImages.long}
            alt='Long image example'
          />
        </div>
      </section>

      {/* Custom Image with Transformations */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          Custom Image with Transformations
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <CloudinaryImage
            publicId={demoImages.custom}
            alt='Custom image with blur effect'
            width={600}
            height={400}
            crop='fill'
            quality='high'
            blur={true}
            className='rounded-lg shadow-lg'
          />
          <CloudinaryImage
            publicId={demoImages.custom}
            alt='Custom image with different crop'
            width={600}
            height={400}
            crop='thumb'
            quality='auto'
            className='rounded-lg shadow-lg'
          />
        </div>
      </section>

      {/* Responsive Grid Example */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Responsive Grid</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            demoImages.nature,
            demoImages.people,
            demoImages.animals,
            demoImages.square,
            demoImages.custom,
            demoImages.full,
          ].map((publicId, i) => (
            <CloudinarySquareImage
              key={i}
              publicId={publicId}
              alt={`Grid image ${i + 1}`}
              className='hover:scale-105 transition-transform duration-300'
            />
          ))}
        </div>
      </section>

      {/* Image with Custom Sizes */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Custom Sizes</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <CloudinaryImage
            publicId={demoImages.square}
            alt='Small image'
            width={200}
            height={200}
            crop='fill'
            className='rounded-full'
          />
          <CloudinaryImage
            publicId={demoImages.square}
            alt='Medium image'
            width={300}
            height={300}
            crop='fill'
            className='rounded-lg'
          />
          <CloudinaryImage
            publicId={demoImages.square}
            alt='Large image'
            width={400}
            height={400}
            crop='fill'
            className='rounded-xl'
          />
        </div>
      </section>

      {/* Advanced Transformations */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Advanced Transformations</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <CloudinaryImage
            publicId={demoImages.nature}
            alt='Grayscale image'
            width={300}
            height={200}
            crop='fill'
            className='rounded-lg'
          />
          <CloudinaryImage
            publicId={demoImages.people}
            alt='Blurred background'
            width={300}
            height={200}
            crop='fill'
            className='rounded-lg'
          />
          <CloudinaryImage
            publicId={demoImages.animals}
            alt='High quality'
            width={300}
            height={200}
            crop='fill'
            quality='best'
            className='rounded-lg'
          />
          <CloudinaryImage
            publicId={demoImages.custom}
            alt='WebP format'
            width={300}
            height={200}
            crop='fill'
            format='webp'
            className='rounded-lg'
          />
        </div>
      </section>
    </div>
  );
}
