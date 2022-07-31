import setItemByIndexes from "./setItemByIndexes.js";

export async function dispatcher(router, { method, url, args }) {
  let action = router.state[method][url];

  if (!action) {
    const urlSplitted = url.split("/");
    const dynamicParams = {};

    const urlsWithParams =
      router.endpointsWithDynamicParams[method][`${urlSplitted.length}`];

    if (urlsWithParams) {
      let urlsWithParamsLength = urlsWithParams.length;

      for (; urlsWithParamsLength--; ) {
        setItemByIndexes(
          urlSplitted,
          dynamicParams,
          urlsWithParams[urlsWithParamsLength]["params"]
        );
      }

      action = router.state[method][urlSplitted.join("/")];
      args.params = dynamicParams;
    }
  }

  if (!action) {
    args.res.writeHead(404, { "Content-Type": "text/plain" });
    args.res.write("404 Not Found");
    args.res.end();
  }

  typeof action === "function" && (await action(args));
}
