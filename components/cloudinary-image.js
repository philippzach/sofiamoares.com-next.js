'use client';

import Image from 'next/image';
import { getCloudinaryUrl, getResponsiveImageUrls } from '../lib/cloudinary';

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className = '',
  pictureClassName = '',
  placeholderClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 'auto',
  crop = 'fill',
  format = 'auto',
  blur = true,
  ...props
}) {
  // Generate responsive image URLs
  const responsiveUrls = getResponsiveImageUrls(
    publicId,
    [400, 800, 1200, 1600]
  );

  // Create srcSet for responsive images
  const srcSet = responsiveUrls
    .map(({ width: w, url }) => `${url} ${w}w`)
    .join(', ');

  // Get the main image URL
  const mainUrl = getCloudinaryUrl(publicId, {
    width,
    height,
    crop,
    quality,
    format,
  });

  // Get placeholder URL (blurred version) - smaller and lower quality
  const placeholderUrl = blur
    ? getCloudinaryUrl(publicId, {
        width: Math.max(20, Math.round(width / 20)),
        height: Math.max(15, Math.round(height / 20)),
        crop: 'fill',
        quality: 'low',
      })
    : null;

  return (
    <div className={`relative ${pictureClassName}`}>
      {placeholderUrl && (
        <Image
          src={placeholderUrl}
          alt={alt}
          width={width}
          height={height}
          className={`${placeholderClassName} blur-sm absolute inset-0`}
          priority={priority}
        />
      )}
      <Image
        src={mainUrl}
        alt={alt}
        width={width}
        height={height}
        className={`${className} relative z-10 transition-opacity duration-500`}
        srcSet={srcSet}
        sizes={sizes}
        priority={priority}
        {...props}
      />
    </div>
  );
}

// Component for square images (similar to SquareImage from DatoCMS)
export function CloudinarySquareImage({
  publicId,
  alt,
  className = '',
  ...props
}) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={400}
      height={400}
      crop='fill'
      className={`h-auto object-contain object-left-bottom w-full block ${className}`}
      {...props}
    />
  );
}

// Component for full-width images (similar to FullImage from DatoCMS)
export function CloudinaryFullImage({
  publicId,
  alt,
  className = '',
  ...props
}) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={1200}
      height={800}
      crop='fill'
      className={`h-auto object-contain object-left-bottom w-full block ${className}`}
      {...props}
    />
  );
}

// Component for long/portrait images (similar to LongImage from DatoCMS)
export function CloudinaryLongImage({
  publicId,
  alt,
  className = '',
  ...props
}) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={600}
      height={900}
      crop='fill'
      className={`object-cover w-full h-full ${className}`}
      {...props}
    />
  );
}
