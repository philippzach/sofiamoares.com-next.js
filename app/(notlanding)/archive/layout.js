import Navigation from '@/components/navigation-archive';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { performRequest } from '@/lib/datocms';

const allCategories = await performRequest({
  query: `{ allCategories { slug name } }`,
});

export default function Layout({ children }) {
  return (
    <div className='min-h-screen pt-32 pb-32'>
      <Navigation data={allCategories} />
      {children}
      <SpeedInsights />
    </div>
  );
}
