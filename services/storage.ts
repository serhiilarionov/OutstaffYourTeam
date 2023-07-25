import * as storage from "../api/index";

export async function getFromFile() {
  return Promise.all(
    Object.entries(storage).map(async ([key, value]) => [key, await value()])
  ).then((res) => Object.fromEntries(res));
}
