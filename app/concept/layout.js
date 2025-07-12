import '../globals.css';
import { toNextMetadata } from 'react-datocms';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment } from '@/lib/fragments';

import NavigationNl from '@/components/navigation-nl';
import HotjarInit from '@/components/hotjar-init';

import { officeTimes, aeonik } from 'app/styles/fonts';

const PAGE_CONTENT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    blog {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }

  ${metaTagsFragment}
  
`;

function getPageRequest() {
  return { query: PAGE_CONTENT_QUERY };
}

export async function generateMetadata() {
  const { site, blog } = await performRequest(getPageRequest());

  return toNextMetadata([...site.favicon, ...blog.seo]);
}

export default async function RootLayout({ children }) {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);
  return (
    <html lang='en' className={`${officeTimes.variable} ${aeonik.variable}`}>
      <body className='text-slate-100 bg-[#1a1a1a] font-primary pr-4 pl-4'>
        <HotjarInit />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
