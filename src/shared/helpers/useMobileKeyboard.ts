import { useEffect, useRef, useState } from "react";

export function useMobileKeyboard() {
  const [open, setOpen] = useState(false);

  const baseHeightRef = useRef<number | null>(null);
  const lastStateRef = useRef(false);

  useEffect(() => {
    if (!window.visualViewport) return;

    const viewport = window.visualViewport;

    if (baseHeightRef.current === null) {
      baseHeightRef.current = viewport.height;
    }

    const closeThreshold = 0.15;
    const openThreshold = 0.3;

    const handleResize = () => {
      const base = baseHeightRef.current!;
      const current = viewport.height;

      const ratio = (base - current) / base;

      let next = lastStateRef.current;

      if (!lastStateRef.current && ratio > openThreshold) {
        next = true;
      }

      if (lastStateRef.current && ratio < closeThreshold) {
        next = false;
      }

      if (next !== lastStateRef.current) {
        lastStateRef.current = next;
        setOpen(next);
      }
    };

    viewport.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("resize", handleResize);
    };
  }, []);

  return open;
}
