export const filterObjWithKey = (key: string, obj: any) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};
