export function getUsers({ res, req, params }) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message: "Hello users" }));
  res.end();
}

export function getUser({ res, params }) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      message: "Hello user",
      params,
    })
  );
  res.end();
}
export function createUsers({ res, req }) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message: "Hello POST" }));
  res.end();
}
