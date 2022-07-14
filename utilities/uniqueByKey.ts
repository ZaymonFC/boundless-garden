export const uniqueByKey =
  <Obj>() =>
  <Property extends keyof Obj>(property: Property) =>
  (xs: Obj[]) => {
    return Array.from(new Map(xs.map((item) => [item[property], item])).values());
  };
