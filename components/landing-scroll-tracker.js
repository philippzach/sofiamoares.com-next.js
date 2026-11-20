'use client';
import { useEffect, useRef } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export default function LandingScrollTracker() {
  const firedDepths = useRef(new Set());
  const firedSection = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight;
      const seen = window.scrollY + window.innerHeight;
      const pct = total > 0 ? (seen / total) * 100 : 0;
      for (const t of [25, 50, 75, 100]) {
        if (pct >= t && !firedDepths.current.has(t)) {
          firedDepths.current.add(t);
          sendGAEvent('event', 'scroll_depth', { percent: t, page: '/' });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById('landing-work-section');
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedSection.current) {
          firedSection.current = true;
          sendGAEvent('event', 'work_section_view', { page: '/' });
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
