export const unique = function <T>(
  data: T[],
  uniqueKey: keyof T,
  unificatorKey: keyof T
) {
  for (let i = 0; i < data.length; i++) {
    let shouldUpdate = false;
    for (let j = i + 1; j < data.length; j++) {
      if (data[i][uniqueKey] === data[j][uniqueKey]) {
        shouldUpdate = true;
        data[j] = {
          ...data[j],
          [uniqueKey]: `${data[j][uniqueKey]} ${data[j][unificatorKey]}`,
        };
      }
    }
    if (shouldUpdate) {
      data[i] = {
        ...data[i],
        [uniqueKey]: `${data[i][uniqueKey]} ${data[i][unificatorKey]}`,
      };
    }
  }

  return data;
};
