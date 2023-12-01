'use client'

import React, {useEffect, useRef} from 'react'
import Script from "next/script";

if (typeof window !== 'undefined') {
  window.anymindTS = window.anymindTS || {que: []};
}
export const runAts = () => {
  window.anymindTS.que.push(function () {
    window.startAnymindTS();
  });
};

export const disposeAts = () => {
  window.anymindTS.que.push(function () {
    window.anymindTS.dispose()
  });
};

const ATSManager = () => {
  const didRunAts = useRef(false);  // ensure call runAts once
  const didDisposeAts = useRef(false);  // ensure call disposeAts once
  useEffect(() => {
    if (!didRunAts.current) {
      console.log('run ats');
      runAts();
      didRunAts.current = true;
    }
    return () => {
      if (!didDisposeAts.current && didRunAts.current) {
        console.log('dispose ats');
        disposeAts();
        didDisposeAts.current = true;
      }
    }
  }, [])
  return <Script src="https://anymind360.com/js/12415/ats.js"></Script>
}

export default ATSManager