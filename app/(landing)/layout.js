import '../globals.css';

import { draftMode } from 'next/headers';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang='en'>
      <body className='text-prim-grey'>{children}</body>
    </html>
  );
}
