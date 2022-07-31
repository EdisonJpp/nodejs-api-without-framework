import http from "http";
import { dispatcher } from "./lib/dispatcher.js";

function server(router) {
  return http.createServer(async (req, res) => {
    const { url, method } = req;

    const args = { req, res };
    const arrURL = url.split("?");

    if (arrURL[1]) args.queryParams = new URLSearchParams(arrURL[1]);
    await dispatcher(router, { method, url: arrURL[0], args });
  });
}

class App {
  router = null;
  port = null;

  async listen(port) {
    this.router && this.router.setEndpointsWithDynamicParams();
    this.port = port || 5000;
    server(this.router).listen(this.port);
  }

  use(item) {
    if (item.state.GET) {
      this.router = item;
    }
  }

  getPort() {
    return this.port;
  }
}

export default new App();
export * from "./lib/router.js";
