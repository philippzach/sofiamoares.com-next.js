import '../globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

import NavigationNl from '@/components/navigation-nl';

import { draftMode } from 'next/headers';

import { officeTimes, aeonik } from 'app/styles/fonts';
import Footer from '@/components/footer';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang='en' className={`${officeTimes.variable} ${aeonik.variable}`}>
      <body className='text-prim-grey font-primary pr-4 pl-4'>
        <NavigationNl />
        {children}
        <Footer />
        <GoogleAnalytics gaId='G-MH6B7ZXWP1' />
      </body>
    </html>
  );
}
