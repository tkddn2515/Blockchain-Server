export const promise = async (p, ms) => {
  let timer;
  try {
    const res = await Promise.race([
      p,
      new Promise((resolve) => {
        timer = setTimeout(() => resolve("timeout"), ms);
      }),
    ]).finally(() => clearTimeout(timer));
    return res;
  } catch(err) {
    return `promise error, ${err}`;
  }
}

export const isPromiseError = (res) => {
  if(typeof res === "number") {
    return false;
  }else {
    return true;
  }
}