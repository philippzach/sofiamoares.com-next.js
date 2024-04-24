import '../globals.css';

import { draftMode } from 'next/headers';
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang='en'>
      <body className='text-prim-grey'>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
