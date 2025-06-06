import '../globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

import { draftMode } from 'next/headers';
import { officeTimes, aeonik } from 'app/styles/fonts';

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={` overflow-hidden ${officeTimes.variable} ${aeonik.variable}`}
    >
      <body className='text-prim-grey font-primary'>{children}</body>
      <GoogleAnalytics gaId='G-MH6B7ZXWP1' />
    </html>
  );
}
