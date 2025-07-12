'use client';

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

// Hotjar configuration
const SITE_ID = 5048202;
const HOTJAR_VERSION = 6;

/**
 * Injects the Hotjar tracking script across the entire site.
 * Placed at the root layout level so it runs exactly once per page load.
 */
export default function HotjarInit() {
  useEffect(() => {
    // Guard against multiple initialisations in development with React Strict Mode
    if (!window.__HOTJAR_INITIALIZED__) {
      Hotjar.init(SITE_ID, HOTJAR_VERSION);
      window.__HOTJAR_INITIALIZED__ = true;
    }
  }, []);

  return null;
}
