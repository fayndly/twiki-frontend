import { useEffect, useState } from "react";

export function useAnyFieldFocused() {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      setIsFocused(
        target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
      );
    };

    const onFocusOut = () => {
      requestAnimationFrame(() => {
        const el = document.activeElement as HTMLElement | null;
        setIsFocused(
          !!el &&
            (el.tagName === "INPUT" ||
              el.tagName === "TEXTAREA" ||
              el.isContentEditable)
        );
      });
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return isFocused;
}
