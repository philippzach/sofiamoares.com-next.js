// Client-safe Cloudinary utilities
// This file only contains client-side functions for URL generation

// Utility function to get Cloudinary URL with transformations
export function getCloudinaryUrl(publicId, options = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    ...otherOptions
  } = options;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  const transformations = [];

  if (width || height) {
    transformations.push(
      `w_${width || 'auto'},h_${height || 'auto'},c_${crop}`
    );
  }

  if (quality) {
    transformations.push(`q_${quality}`);
  }

  if (format) {
    transformations.push(`f_${format}`);
  }

  // Add any other transformations
  Object.entries(otherOptions).forEach(([key, value]) => {
    transformations.push(`${key}_${value}`);
  });

  const transformationString =
    transformations.length > 0 ? transformations.join('/') + '/' : '';

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
}

// Utility function to get responsive image URLs
export function getResponsiveImageUrls(
  publicId,
  sizes = [400, 800, 1200, 1600]
) {
  return sizes.map((size) => ({
    width: size,
    height: Math.round(size * 0.75), // 4:3 aspect ratio
    url: getCloudinaryUrl(publicId, {
      width: size,
      height: Math.round(size * 0.75),
    }),
  }));
}
