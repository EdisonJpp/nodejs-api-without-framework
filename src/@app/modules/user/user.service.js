export function getUsers({ res, req }) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message: "Hello users" }));
  res.end();
}
