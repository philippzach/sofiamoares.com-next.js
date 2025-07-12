import Image from 'next/image';
import { getCloudinaryUrl } from '../lib/cloudinary';

export default function SimpleCloudinaryExamples() {
  // Example 1: Basic Next.js Image with Cloudinary and blur effect
  const basicExample = () => (
    <div className='relative'>
      {/* Blur placeholder */}
      <Image
        src={getCloudinaryUrl('samples/dessert-on-a-plate', {
          width: 20,
          height: 15,
          crop: 'fill',
          quality: 'low',
        })}
        alt='Dessert on a plate'
        width={400}
        height={300}
        className='blur-sm absolute inset-0'
      />
      {/* Main image */}
      <Image
        src={getCloudinaryUrl('samples/dessert-on-a-plate', {
          width: 400,
          height: 300,
          crop: 'fill',
        })}
        alt='Dessert on a plate'
        width={400}
        height={300}
        className='relative z-10 rounded-lg opacity-100 transition-opacity duration-300'
      />
    </div>
  );

  // Example 2: Responsive Next.js Image with Cloudinary and blur effect
  const responsiveExample = () => {
    const publicId = 'samples/cup-on-a-table';
    const sizes = [400, 800, 1200];

    const srcSet = sizes
      .map(
        (size) =>
          `${getCloudinaryUrl(publicId, {
            width: size,
            height: Math.round(size * 0.75),
            crop: 'fill',
          })} ${size}w`
      )
      .join(', ');

    return (
      <div className='relative'>
        {/* Blur placeholder */}
        <Image
          src={getCloudinaryUrl(publicId, {
            width: 20,
            height: 15,
            crop: 'fill',
            quality: 'low',
          })}
          alt='Cup on a table'
          width={800}
          height={600}
          className='blur-sm absolute inset-0'
        />
        {/* Main image */}
        <Image
          src={getCloudinaryUrl(publicId, {
            width: 800,
            height: 600,
            crop: 'fill',
          })}
          alt='Cup on a table'
          width={800}
          height={600}
          srcSet={srcSet}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='relative z-10 rounded-lg opacity-100 transition-opacity duration-300'
        />
      </div>
    );
  };

  // Example 3: Next.js Image with Cloudinary transformations and blur effect
  const transformedExample = () => (
    <div className='relative'>
      {/* Blur placeholder */}
      <Image
        src={getCloudinaryUrl('samples/man-portrait', {
          width: 20,
          height: 20,
          crop: 'thumb',
          quality: 'low',
        })}
        alt='Man portrait'
        width={300}
        height={300}
        className='blur-sm absolute inset-0 rounded-full'
      />
      {/* Main image */}
      <Image
        src={getCloudinaryUrl('samples/man-portrait', {
          width: 300,
          height: 300,
          crop: 'thumb',
          quality: 'high',
          format: 'webp',
        })}
        alt='Man portrait'
        width={300}
        height={300}
        className='relative z-10 rounded-full opacity-100 transition-opacity duration-300'
      />
    </div>
  );

  // Example 4: Next.js Image with enhanced blur placeholder
  const blurPlaceholderExample = () => (
    <div className='relative'>
      {/* Blur placeholder */}
      <Image
        src={getCloudinaryUrl('samples/breakfast', {
          width: 20,
          height: 15,
          crop: 'fill',
          quality: 'low',
        })}
        alt='Breakfast'
        width={400}
        height={300}
        className='blur-md absolute inset-0'
      />
      {/* Main image */}
      <Image
        src={getCloudinaryUrl('samples/breakfast', {
          width: 400,
          height: 300,
          crop: 'fill',
        })}
        alt='Breakfast'
        width={400}
        height={300}
        className='relative z-10 rounded-lg opacity-100 transition-opacity duration-500'
      />
    </div>
  );

  // Example 5: Grid with lazy loading blur effects
  const gridExample = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {[
        'samples/dessert-on-a-plate',
        'samples/cup-on-a-table',
        'samples/coffee',
      ].map((publicId, i) => (
        <div key={i} className='relative'>
          {/* Blur placeholder */}
          <Image
            src={getCloudinaryUrl(publicId, {
              width: 20,
              height: 13,
              crop: 'fill',
              quality: 'low',
            })}
            alt={`Image ${i + 1}`}
            width={300}
            height={200}
            className='blur-sm absolute inset-0 rounded-lg'
          />
          {/* Main image */}
          <Image
            src={getCloudinaryUrl(publicId, {
              width: 300,
              height: 200,
              crop: 'fill',
            })}
            alt={`Image ${i + 1}`}
            width={300}
            height={200}
            className='relative z-10 rounded-lg hover:scale-105 transition-all duration-300 opacity-100'
          />
        </div>
      ))}
    </div>
  );

  // Example 6: Progressive loading with multiple blur stages
  const progressiveExample = () => (
    <div className='relative'>
      {/* Very blurry placeholder */}
      <Image
        src={getCloudinaryUrl('samples/balloons', {
          width: 10,
          height: 7,
          crop: 'fill',
          quality: 'low',
        })}
        alt='Balloons'
        width={500}
        height={350}
        className='blur-xl absolute inset-0'
      />
      {/* Less blurry placeholder */}
      <Image
        src={getCloudinaryUrl('samples/balloons', {
          width: 50,
          height: 35,
          crop: 'fill',
          quality: 'low',
        })}
        alt='Balloons'
        width={500}
        height={350}
        className='blur-md absolute inset-0 opacity-50'
      />
      {/* Main image */}
      <Image
        src={getCloudinaryUrl('samples/balloons', {
          width: 500,
          height: 350,
          crop: 'fill',
        })}
        alt='Balloons'
        width={500}
        height={350}
        className='relative z-10 rounded-lg opacity-100 transition-opacity duration-500'
      />
    </div>
  );

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <h1 className='text-3xl font-bold mb-8'>
        Next.js Image + Cloudinary with Lazy Loading Blur Effects
      </h1>

      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8'>
        <h2 className='text-lg font-semibold text-blue-800 mb-2'>
          How the Blur Effect Works
        </h2>
        <p className='text-blue-700 mb-2'>
          Each image shows a very small, low-quality blurred version while the
          main image loads. The main image appears on top with a smooth
          transition.
        </p>
        <ul className='text-blue-700 list-disc list-inside space-y-1'>
          <li>Blur placeholder: 20x15px low-quality image</li>
          <li>Smooth transition: 300-500ms fade-in animation</li>
          <li>Progressive loading: Multiple blur stages for better UX</li>
          <li>Server-side optimized: No client-side JavaScript required</li>
        </ul>
      </div>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          1. Basic Image with Blur Effect
        </h2>
        {basicExample()}
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          2. Responsive Image with Blur Effect
        </h2>
        {responsiveExample()}
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          3. Transformed Image with Blur Effect
        </h2>
        {transformedExample()}
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>4. Enhanced Blur Placeholder</h2>
        {blurPlaceholderExample()}
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          5. Grid with Lazy Loading Blur Effects
        </h2>
        {gridExample()}
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>
          6. Progressive Loading with Multiple Blur Stages
        </h2>
        {progressiveExample()}
      </section>
    </div>
  );
}
