// mutate items
export default function remoteItemByIndexes(items, indexes) {
  let length = indexes.length;

  for (; length--; ) {
    items[indexes[length]] = "";
  }
}
