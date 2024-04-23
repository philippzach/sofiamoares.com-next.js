import '../globals.css';

import NavigationNl from '@/components/navigation-nl';

import { draftMode } from 'next/headers';

export default function RootLayout({ children }) {
  const { isEnabled } = draftMode();

  return (
    <html lang='en'>
      <body className='text-prim-grey'>
        <NavigationNl />
        {children}
      </body>
    </html>
  );
}
