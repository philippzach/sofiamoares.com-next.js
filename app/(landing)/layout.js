import '../globals.css';

import { draftMode } from 'next/headers';
import { officeTimes, aeonik } from 'app/styles/fonts';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html
      lang='en'
      className={` overflow-hidden ${officeTimes.variable} ${aeonik.variable}`}
    >
      <body className='text-prim-grey font-primary'>{children}</body>
    </html>
  );
}
