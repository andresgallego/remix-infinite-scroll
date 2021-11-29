export type GObject<DataType> = {
  [key: string]: DataType;
};

export type PickValue<Obj, Prop extends keyof Obj> = Pick<Obj, Prop>[Prop];
