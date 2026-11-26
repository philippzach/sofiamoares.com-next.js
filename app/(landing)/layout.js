import '../globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { draftMode } from 'next/headers';
import { officeTimes, aeonik } from 'app/styles/fonts';
import HotjarInit from '@/components/hotjar-init';
import PinterestTag from '@/components/pinterest-tag';

export const metadata = {
  title: 'Sofia Moraes. I Translate Essences Into Visual Worlds',
  description: 'Creative direction for mission-driven founders. Brand identity systems, visual architecture, and strategy that makes people feel your essence before they understand it.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${officeTimes.variable} ${aeonik.variable} scroll-smooth`}
    >
      <body className='text-prim-grey font-primary'>
        <HotjarInit />
        <PinterestTag />
        {children}
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId='G-MH6B7ZXWP1' />
    </html>
  );
}
