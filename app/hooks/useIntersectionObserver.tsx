import { useCallback, useEffect, useRef } from "react";

function useInfiniteScroll(callbackParam: any) {
  const observer = useRef<any>();

  const callback = useCallback(
    ([entry]) => {
      if (entry.length === 0 || !entry.isIntersecting) {
        return;
      }

      // if (entry.isIntersecting) {
      callbackParam();
      // }
    },
    [callbackParam]
  );

  const infiniteScrollRef = useCallback(
    (node) => {
      if (!node) {
        return;
      }

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(callback);
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
