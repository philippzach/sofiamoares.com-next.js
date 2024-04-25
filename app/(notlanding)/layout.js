import '../globals.css';

import NavigationNl from '@/components/navigation-nl';

import { draftMode } from 'next/headers';

import { officeTimes, aeonik } from 'app/styles/fonts';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang='en' className={`${officeTimes.variable} ${aeonik.variable}`}>
      <body className='text-prim-grey font-primary'>
        <NavigationNl />
        {children}
      </body>
    </html>
  );
}
