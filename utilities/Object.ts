export const keys = <Obj>(obj: Obj): (keyof Obj)[] => Object.keys(obj) as (keyof Obj)[];
