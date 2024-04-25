import localFont from 'next/font/local';

export const officeTimes = localFont({
  src: '../fonts/OfficeTimesSharp.woff2',
  display: 'swap',
  variable: '--font-officeTimes',
});

export const aeonik = localFont({
  src: [
    {
      path: '../fonts/Aeonik-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik',
  display: 'swap',
});
