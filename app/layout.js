import './globals.css';

import Alert from '@/components/alert';
import Navigation from '@/components/navigation';

import { draftMode } from 'next/headers';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang='en'>
      <body className='text-prim-grey'>
        <Navigation />
        {/* <Alert preview={isEnabled} /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
