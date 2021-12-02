export type GObject<DataType> = {
  [key: PropertyKey]: DataType;
};

export type PickValue<Obj, Prop extends keyof Obj> = Pick<Obj, Prop>[Prop];
