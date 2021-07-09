export const removeUndefinedValues = (request: Readonly<any>) => {
  const result: any = {};
  Object.keys(request)
    .forEach(key => {
      if (request[key] !== undefined) {
        result[key] = request[key];
      }
    });
  return result;
};
