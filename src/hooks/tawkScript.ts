"use client"

import { useEffect } from 'react';

function TawkToScript() {
  useEffect(() => {
    // Create a new script element
    const script = document.createElement('script');
    script.async = true;
    script.type="text/javascript";
    script.src = 'https://embed.tawk.to/668ede0d7a36f5aaec96e048/1i2f16q8k';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the document's head
    document.head.appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component is unmounted
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
}

export default TawkToScript;


