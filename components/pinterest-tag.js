'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const PINTEREST_TAG_ID = '2613478177890';

/**
 * Pinterest base tag. Loads once, then fires a `page` event on every
 * client-side route change (App Router navigations don't reload the page).
 */
export default function PinterestTag() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The initial page view is sent by the inline script below.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.pintrk) {
      window.pintrk('page');
      window.pintrk('track', 'pagevisit');
    }
  }, [pathname]);

  return (
    <>
      <Script id='pinterest-tag' strategy='afterInteractive'>
        {`
!function(e){if(!window.pintrk){window.pintrk = function () {
window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
  n=window.pintrk;n.queue=[],n.version="3.0";var
  t=document.createElement("script");t.async=!0,t.src=e;var
  r=document.getElementsByTagName("script")[0];
  r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
pintrk('load', '${PINTEREST_TAG_ID}');
pintrk('page');
pintrk('track', 'pagevisit');
        `}
      </Script>
      <noscript>
        <img
          height='1'
          width='1'
          style={{ display: 'none' }}
          alt=''
          src={`https://ct.pinterest.com/v3/?event=init&tid=${PINTEREST_TAG_ID}&noscript=1`}
        />
      </noscript>
    </>
  );
}
