# Cloudinary Integration Setup

This guide explains how to set up and use Cloudinary for image management in your Next.js application.

## Prerequisites

1. A Cloudinary account (sign up at [cloudinary.com](https://cloudinary.com))
2. Your Cloudinary credentials (Cloud Name, API Key, API Secret)

## Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials.

## Getting Your Cloudinary Credentials

1. Log in to your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy your Cloud Name, API Key, and API Secret

## Usage

### Basic Image Component

```jsx
import CloudinaryImage from '../components/cloudinary-image';

<CloudinaryImage
  publicId='your_image_public_id'
  alt='Image description'
  width={800}
  height={600}
/>;
```

### Pre-built Components

```jsx
import {
  CloudinarySquareImage,
  CloudinaryFullImage,
  CloudinaryLongImage
} from '../components/cloudinary-image';

// Square image (400x400)
<CloudinarySquareImage
  publicId="your_image_public_id"
  alt="Square image"
/>

// Full width image (1200x800)
<CloudinaryFullImage
  publicId="your_image_public_id"
  alt="Full width image"
/>

// Long/portrait image (600x900)
<CloudinaryLongImage
  publicId="your_image_public_id"
  alt="Long image"
/>
```

### Advanced Usage with Transformations

```jsx
<CloudinaryImage
  publicId='your_image_public_id'
  alt='Custom image'
  width={600}
  height={400}
  crop='fill'
  quality='high'
  format='webp'
  blur={true}
  className='rounded-lg shadow-lg'
/>
```

## Available Props

- `publicId`: Your Cloudinary image public ID
- `alt`: Alt text for accessibility
- `width`: Image width
- `height`: Image height
- `crop`: Crop mode ('fill', 'thumb', 'scale', etc.)
- `quality`: Image quality ('auto', 'low', 'good', 'best')
- `format`: Image format ('auto', 'webp', 'jpg', 'png')
- `blur`: Enable blur placeholder (boolean)
- `className`: CSS classes
- `priority`: Load image with priority (boolean)

## Demo Page

Visit `/cloudinary-demo` to see examples of all the components in action.

## Replacing DatoCMS Images

To replace existing DatoCMS images with Cloudinary:

1. Upload your images to Cloudinary
2. Replace the DatoCMS image components with Cloudinary components
3. Update the image data structure to use Cloudinary public IDs

Example replacement:

```jsx
// Before (DatoCMS)
<DatocmsImage data={image.responsiveImage} />

// After (Cloudinary)
<CloudinaryImage
  publicId={image.cloudinaryPublicId}
  alt={image.alt}
  width={image.width}
  height={image.height}
/>
```

## Utility Functions

The `lib/cloudinary.js` file provides utility functions:

```jsx
import { getCloudinaryUrl, getResponsiveImageUrls } from '../lib/cloudinary';

// Get a single image URL
const imageUrl = getCloudinaryUrl('your_public_id', {
  width: 800,
  height: 600,
  crop: 'fill',
});

// Get responsive image URLs
const responsiveUrls = getResponsiveImageUrls(
  'your_public_id',
  [400, 800, 1200]
);
```

## Next Steps

1. Set up your environment variables
2. Upload your images to Cloudinary
3. Replace the demo public IDs with your actual image public IDs
4. Test the integration at `/cloudinary-demo`
5. Start using Cloudinary components in your existing pages
