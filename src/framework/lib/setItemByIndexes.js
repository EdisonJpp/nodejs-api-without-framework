// mutate items
export default function setItemByIndexes(items, objParams, indexes) {
  let length = indexes.length;

  for (; length--; ) {
    const curr = indexes[length];

    if (items[curr.index]) {
      objParams[curr.key] = items[curr.index];
      items[curr.index] = `:${curr.key}`;
    }
  }
}
