import { useEffect } from "react";

export function useGSAP(callback: () => void | (() => void), deps: any[] = []) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Wait for GSAP to be available
      const checkGSAP = () => {
        if (window.gsap) {
          const cleanup = callback();
          return cleanup;
        } else {
          setTimeout(checkGSAP, 100);
        }
      };
      
      const cleanup = checkGSAP();
      return cleanup;
    }
  }, deps);
}
