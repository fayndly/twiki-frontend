import { useEffect, useState } from "react";

export function useScrollDirection(container?: HTMLElement | null) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const el = container ?? window;
    let lastScroll = 0;

    const handleScroll = () => {
      const scrollTop = container?.scrollTop ?? window.scrollY;
      const scrollHeight =
        container?.scrollHeight ?? document.documentElement.scrollHeight;
      const clientHeight = container?.clientHeight ?? window.innerHeight;

      const isBottom = scrollTop + clientHeight >= scrollHeight - 2;

      if (isBottom) {
        setShow(true);
      } else if (scrollTop > lastScroll && scrollTop > 50) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScroll = scrollTop;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => el.removeEventListener("scroll", handleScroll);
  }, [container]);

  return show;
}
