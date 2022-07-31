import Framework from "../framework/index.js";
import { router } from "./router.js";

const port = 4000;

async function runner() {
  Framework.use(router);
  await Framework.listen(port);
  console.log(`server is running in port ${Framework.getPort()}`);
}

runner();
