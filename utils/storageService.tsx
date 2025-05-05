const getRealData = (window: any, key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return null;
};

const setRealData = (window: any, key: string, item: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(key, item);
  }
  return null;
};

export default {
  get: getRealData,
  set: setRealData,
};
