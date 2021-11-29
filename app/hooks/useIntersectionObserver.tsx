import { useEffect, useRef, useState } from "react";

function useIntersectionObserver<TElement extends HTMLElement | null>(
  options: Partial<IntersectionObserverInit> = {}
) {
  const [element, setElement] = useState<TElement>();
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, options)
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    if (element) currentObserver.observe(element);

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [element]);

  return { observer: observer?.current, setElement, entries };
}

export { useIntersectionObserver };
