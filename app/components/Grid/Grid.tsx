import { createContext, useContext } from "react";

import { GObject } from "../../types/Generics";

type GridProps = {
  data: GObject<unknown>[];
  renderEmpty?: JSX.Element;
  children: React.ReactNode;
  childrenProps?: GObject<unknown>;
};

const GridContext = createContext<GObject<unknown> | undefined>(undefined);
GridContext.displayName = "GridContext";

function Grid({
  data = [],
  renderEmpty = (
    <div>
      <h2>This list is empty 😭</h2>
    </div>
  ),
  children,
  childrenProps = {},
}: GridProps) {
  return !data.length ? (
    renderEmpty
  ) : (
    <ul className="grid-wrapper">
      {data.map((item: GObject<unknown>, index: number) => (
        <li className="grid-item-wrapper" key={index}>
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
