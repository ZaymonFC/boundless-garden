export const keys = <Obj extends object>(obj: Obj): (keyof Obj)[] =>
  Object.keys(obj) as (keyof Obj)[];
