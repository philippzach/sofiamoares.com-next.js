import Navigation from '@/components/navigation-archive';
import { performRequest } from '@/lib/datocms';

const allCategories = await performRequest({
  query: `{ allCategories { slug name } }`,
});

export default function Layout({ children }) {
  return (
    <div className='min-h-screen pt-32 pb-32'>
      <Navigation data={allCategories} />
      {children}
    </div>
  );
}
