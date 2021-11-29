import { useCallback, useEffect, useRef } from "react";

function useInfiniteScroll(
  callbackParam: () => void,
  options: Partial<IntersectionObserverInit> = {}
) {
  const observer = useRef<IntersectionObserver>();

  const callback = useCallback(
    ([entry]) => {
      if (entry.length === 0 || !entry.isIntersecting) {
        return;
      }

      callbackParam();
    },
    [callbackParam]
  );

  const infiniteScrollRef = useCallback(
    (node) => {
      if (!node) {
        return;
      }

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(callback, options);
      observer.current.observe(node);
    },
    [callback]
  );
  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return infiniteScrollRef;
}

export { useInfiniteScroll };
