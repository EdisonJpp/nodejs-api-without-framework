// mutate data
export default function defineUrlParams(urlSplitted, params) {
  let length2 = urlSplitted.length;

  for (; length2--; ) {
    if (urlSplitted[length2].includes(":")) {
      params.push({
        index: length2,
        key: urlSplitted[length2].replace(":", ""),
      });
    }
  }
}
