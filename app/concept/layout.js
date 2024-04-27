import '../globals.css';

import NavigationNl from '@/components/navigation-nl';

import { officeTimes, aeonik } from 'app/styles/fonts';

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${officeTimes.variable} ${aeonik.variable}`}>
      <body className='text-slate-100 bg-gray-900 font-primary pr-4 pl-4'>
        {children}
      </body>
    </html>
  );
}
