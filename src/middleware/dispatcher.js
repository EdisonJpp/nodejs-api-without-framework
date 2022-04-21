export async function dispatcher(router, { method, url, args }) {
  const action = router.state[method][url];

  if (!action) {
    args.res.writeHead(404, { "Content-Type": "text/plain" });
    args.res.write("404 Not Found");
    args.res.end();
  }

  typeof action === "function" && (await action(args));
}
