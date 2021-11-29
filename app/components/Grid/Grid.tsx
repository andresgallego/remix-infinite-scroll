import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { GObject } from "../../types/Generics";

type GridProps = {
  data: GObject<unknown>[];
  renderEmpty?: JSX.Element;
  loadMore: () => void;
  children: React.ReactNode;
  childrenProps?: GObject<unknown>;
};

const GridContext = createContext<GObject<unknown> | undefined>(undefined);
GridContext.displayName = "GridContext";

function useInfiniteScroll(callbackParam: any) {
  const observer = useRef<any>(null);

  const callback = useCallback(
    (entries) => {
      if (entries.length === 0) {
        return;
      }

      if (entries[0].isIntersecting) {
        callbackParam();
      }
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

function Grid({
  data = [],
  renderEmpty = (
    <div>
      <h2>This list is empty 😭</h2>
    </div>
  ),
  loadMore,
  children,
  childrenProps = {},
}: GridProps) {
  const lastElementRef = useRef<HTMLLIElement>(null);
  const { observer, setElement, entries } = useIntersectionObserver();
  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lastItem = entry.target;
        observer.unobserve(lastItem);
        loadMore();
      }
    });
  }, [entries, loadMore, observer]);

  useEffect(() => {
    setElement(lastElementRef.current);
  }, [data, setElement]);

  // const lastElementRef = useInfiniteScroll(loadMore);

  console.log({ length: data.length });

  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item: GObject<unknown>, index: number) => (
        <li key={index} ref={lastElementRef}>
          <GridProvider value={{ item, ...childrenProps }}>
            {children}
          </GridProvider>
        </li>
      ))}
    </ul>
  );
}

export function useGrid<DataType>() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used within a <Grid />");
  }
  return context as unknown as DataType;
}

export function GridProvider({
  value,
  ...props
}: {
  value: GObject<unknown>;
  children: React.ReactNode;
}) {
  return <GridContext.Provider value={value} {...props} />;
}

export default Grid;
