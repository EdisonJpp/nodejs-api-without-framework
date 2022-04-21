import http from "http";
import { router } from "./router.js";
import { dispatcher } from "../middleware/dispatcher.js";

export default http.createServer(async (req, res) => {
  const { url, method } = req;
  const args = { req, res };
  const arrURL = url.split("?");
  const cleanURL = arrURL[0];

  if (arrURL[1]) args.params = new URLSearchParams(arrURL[1]);
  await dispatcher(router, { method, url: cleanURL, args });
});
