import '../globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { draftMode } from 'next/headers';
import { officeTimes, aeonik } from 'app/styles/fonts';
import HotjarInit from '@/components/hotjar-init';

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={` overflow-hidden ${officeTimes.variable} ${aeonik.variable}`}
    >
      <body className='text-prim-grey font-primary'>
        <HotjarInit />
        {children}
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId='G-MH6B7ZXWP1' />
    </html>
  );
}
