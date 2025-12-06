'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { app } from '../utils/firebase';

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          const analytics = getAnalytics(app);
          logEvent(analytics, 'page_view', {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title
          });
        }
      });
    }
  }, [pathname, searchParams]);

  return null;
}
